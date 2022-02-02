library(tidyverse)
library(lubridate)
library(janitor)
dta <- read_csv("data/ArchSPCPASB.csv") %>% 
  clean_names() %>% names
  mutate(approval_date = as_date(approval_date, format ="%m/%d/%Y")) 
  filter(`Country Name` %in% c("KOREA", "THAILAND", "INDONESIA"))
View(dta)
