library(tidyverse)
library(readxl)
library(sf)
library(maptools)
library(geojsonio)
library(zoo)
library(polylabelr)

data(wrld_simpl)
ne <- read_sf("data/natural_earth/ne_110m_admin_0_countries.shp") %>% 
  rename(iso_code = ISO_A3, name = SOVEREIGNT)

#descriptions of loans, 2003-present
dta <- read_excel("data/mona/Description.xlsx") %>% 
  select(loan_id = `Arrangement Number`, code = `Country Code`,
          amt = Totalaccess, date = `Approval Date`, Sort)
#the 1993-2003 dataset
dta_93 <- read_csv("data/mona/ArchDescription.csv") %>% 
  select(loan_id = `Arrangement Number`, code = `Country Code`,
          amt = Totalaccess, 
         date = `Approval Date`, Sort) %>% 
  mutate(date = anytime::anytime(date),
         code = as.character(code))

dta <- bind_rows(dta , dta_93) %>% 
  mutate(year  = lubridate::year(date)) %>% 
  group_by(loan_id) %>% 
  slice_max(n = 1, order_by = Sort)  #only use the most revised version of the loan information

dta <- dta %>% 
  mutate(info = pmap(lst(loan_id = loan_id, 
                         date =  date, amt = amt),
                     list)) %>% #assemble loan information into one column, where each element of the column is a list of three items (loan id, date, amt)
  group_by(code) %>% 
  summarize(info = list(info))   #combine every country's data into a single row
  
#the ISO-IMF coutnry code crosswalk 
xwalk <- read_excel("data/mona/co.xlsx", skip = 1)  %>% 
  select(imf_code = `IMF Code`, iso_code = `ISO Code`)  

merged <- wrld_simpl %>% st_as_sf() %>%
  rmapshaper::ms_simplify(keep = .2) %>% 
  select(iso_code = ISO3, name = NAME) %>% 
  left_join(xwalk, by = "iso_code") %>% 
  full_join(dta, by = c("imf_code" = "code")) 
file.remove("data/imf.geojson")
geojson_write(merged, file = "data/imf.geojson")
#jsonlite::write_json(merged, "data/imf.json", auto_unbox = TRUE) 











#trade information from the direction of trade statistics (dots) dataset
dot <- read_csv("data/DOT_05-01-2021 20-16-16-70_timeSeries.csv", 
                col_types = cols(.default = "c")) 
dot <- dot %>% 
  filter(`Indicator Code` == "TXG_FOB_USD") %>% 
  select(imf_code = `Country Code`, 
         partner_code = `Counterpart Country Code`, 
         `1948`:`2020`) %>% 
  pivot_longer(`1948`:`2020`, names_to = "year") 

#compute a 5-year rolling diff left-centered for the "value" column
#this means "value" for each row represents increase in exports over 5 years to another country 
dot <- dot %>% 
  group_by(imf_code, partner_code) %>% 
  mutate(value = as.numeric(value), value = value - lag(value, 5))

country_locations <-  wrld_simpl %>% st_as_sf() %>% 
  mutate(centroids = poi(geometry),
         x = unlist(map(centroids, ~.$x)),
         y = unlist(map(centroids, ~.$y))) %>%
  st_drop_geometry() %>% 
  st_as_sf(coords= c("x","y")) %>% 
  left_join(xwalk, by = c("ISO3" = "iso_code")) %>% 
  select(imf_code, centroids = geometry) %>% 
  as_tibble() %>% 
  drop_na()

loans <- dta %>% unnest(info) %>% unnest_wider(info) %>% 
  mutate(year = lubridate::year(date))

dot <- dot %>% mutate(year = as.numeric(year)) %>% 
  filter(unlist(map(imf_code, ~ . %in% xwalk$imf_code)),
         unlist(map(partner_code, ~ . %in% xwalk$imf_code))) %>% #in the DOT dataset there's 001 for world, other special codes for trade regions and other stuff
  group_by(imf_code, year) %>% 
  slice_max(order_by = value, n = 5) %>% #every row is a partner country, select the top 5 by value (meaning export amt)
  right_join(loans, by = c("year","imf_code" = "code")) %>%  #assigns loan IDs and a filter for only those country-year combinations referring to a loan
  left_join(country_locations, by = c("partner_code" = "imf_code")) %>% 
  rename(partner_centroids = centroids) %>% 
  left_join(country_locations, by = "imf_code") 

dot <- dot %>% ungroup() %>% 
  select(export_value = value, loan_id, centroids, partner_centroids, year, partner_code) %>% 
  filter(!st_is_empty(centroids), !st_is_empty(partner_centroids), export_value > 0) %>% 
  mutate(export_value = log(export_value)^8,
         export_value = (export_value - min(export_value))/(max(export_value) - min(export_value)) * 7 + .1)
#scale export value to between .1 and 8 approx
jsonlite::write_json(dot, "data/export.json")
