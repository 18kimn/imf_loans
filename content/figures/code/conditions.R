library(tidyverse)
library(readxl)
library(lubridate)
library(janitor)
library(haven)
# inet* = oxford conditionality dataset
# Arch* = MONA database 
mona <- read_csv("data/ArchDescription.csv") %>% 
  clean_names() %>% 
  mutate(approval_date = as_date(approval_date, format="%m/%d/%y"),
         year = year(approval_date)) 
conditions <- read_csv("data/ArchSPCPASB.csv") %>% 
  clean_names() %>% 
  filter(review_type == "OldBoardApproval") %>% 
  group_by(arrangement_number) %>% 
  summarize(conditions = paste0(description, collapse = "") %>% 
              str_split("([0-9])\\.") %>% 
              length())

# conditions per arrangement over time
conditions <- read_dta("data/inetdataset_main.dta")
conditions %>% 
  filter(cname == "Thailand") %>%
  mutate(across(c(DEB_IB:W3), as.character)) %>%
  pivot_longer(DEB_IB:W3)

conditions <- read_excel("data/inetdataset_raw.xlsx", 2) %>% 
  clean_names() 
  group_by(arrangement_id, year) %>% 
  count()

# conditions for korea, indonesias, thailand, philippines, mongolia, 

highlights <- mona %>% 
  select()