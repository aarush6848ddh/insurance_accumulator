1) Read Memebeship table based on memberId and get the productID
2) Read Plan table based on productID from Memebership table and map DataReponse.plans[]
3) Map plan.coveragePeripod with request params coverageStartDate and coverageEndDate
2) Get the prefixes from Plan Table

Plan Level CostShare Mapping

1) Read Deduct and OOp tables based on dectPfx and oppPfx
2) Map Plan Level cost share attributes from above query results 

Map Benefits and CostShare

1) Read Benefit table based on bnf_pfx from plan table and HipaaCode request param
2) Map Benefit attributes

Benefit Level CostShare Mapping

