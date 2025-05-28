--BEGIN TRANSACTION

declare @CompanyId int
declare @SupplierCompanyId int
declare @HematCode nvarchar(255)
declare @MaterialElementsID nvarchar(255)
declare @guid nvarchar(100) = '42E6B8AE-E772-4639-BAF7-125ABEB4DBF6'



declare Tests cursor local fast_forward for
 SELECT HematCode, MaterialElementsID
   FROM ProductSupplierTemp

open Tests
-- Instead of fetching twice, I rather set up no-exit loop
while 1 = 1
BEGIN
  -- And then fetch
  fetch next from Tests into @HematCode, @MaterialElementsID
  -- And then, if no row is fetched, exit the loop
  if @@fetch_status <> 0
  begin
     break
  end

  Select @CompanyId = Id
  From Sourcing.Companies
  Where HematCode = @HematCode

  if(Not Exists(select * from Sourcing.SupplierCompanyInfoes where CompanyId = @CompanyId))
  Begin
	Insert Sourcing.SupplierCompanyInfoes(CompanyId,TotalNumberOfEmployees, CreateDate, DataEntryHistoryCode)
	Values(@CompanyId,0,GETDATE(), @guid)
	Set @SupplierCompanyId = SCOPE_IDENTITY()
  End
  ELSE
  Begin
	Select @SupplierCompanyId=Id
	From Sourcing.SupplierCompanyInfoes
	Where CompanyId = @CompanyId
  end


  Insert Into Sourcing.SupplierCompanyProducts(CategoryId,SupplierRoleId,SupplierCompanyInfoId,Status,OriginId, DataEntryHistoryCode, CreateDate)
  SELECT
    Element,1, @SupplierCompanyId,1,347, @guid, GETDATE()
  FROM
    dbo.func_split(@MaterialElementsID, ',')

END

close Tests 
deallocate Tests

--ROLLBACK TRANSACTION
--COMMIT TRANSACTION