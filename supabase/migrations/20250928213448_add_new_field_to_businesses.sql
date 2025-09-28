ALTER TABLE public_web.businesses
  ADD COLUMN company_name TEXT NOT NULL DEFAULT '' ,
  ADD COLUMN sector TEXT NULL ,
  ADD COLUMN employee_count INT NULL ,
  ADD COLUMN description TEXT NULL;