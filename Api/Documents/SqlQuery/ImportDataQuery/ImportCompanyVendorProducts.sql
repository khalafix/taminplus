--BEGIN TRANSACTION

declare @CompanyId int
declare @VendorCompanyId int
declare @HematCode nvarchar(255)
declare @MaterialElementsID nvarchar(255)
declare @guid nvarchar(100) = '88b5ec40-ec7f-4987-b59d-08ed0cbdc8b6'



declare Tests cursor local fast_forward for
 SELECT HeamtCode, MaterialElementId
   FROM [EIEDHemat].[dbo].[VendorProducts]

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

  if(Not Exists(select * from Sourcing.VendorCompanyInfos where CompanyId = @CompanyId))
  Begin
	Insert Sourcing.VendorCompanyInfos(CompanyId, CreateDate, DataEntryHistoryCode, VendorCompanyTypeId, HasDifferentSalesOffice,HasSupplierInIran)
	Values(@CompanyId,GETDATE(), @guid,1, 0, 0)
	Set @VendorCompanyId = SCOPE_IDENTITY()
  End
  ELSE
  Begin
	Select @VendorCompanyId=Id
	From Sourcing.VendorCompanyInfos
	Where CompanyId = @CompanyId
  end


  Insert Into Sourcing.VendorCompanyProducts(CategoryId,VendorCompanyInfoId,Status,OriginId, DataEntryHistoryCode, CreateDate)
  Values(@MaterialElementsID, @VendorCompanyId, 1, 347, @guid, GETDATE())
  --SELECT
  --  Element, @VendorCompanyId,1,347, @guid, GETDATE()
  --FROM
  --  dbo.func_split(@MaterialElementsID, ',')

END

close Tests 
deallocate Tests

--ROLLBACK TRANSACTION
--COMMIT TRANSACTION