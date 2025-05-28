
import React, { useState, useEffect } from "react";
// Message
import { FormattedMessage, } from "react-intl";
import { CPDescriptions, CPDivider } from 'components/CP';
import { Collapse, Row, Spin } from 'antd';
import ServiceProvider from "views/admin/proposal/cartable-procurement-manager/components/ServiceProvider";
import Vendor from "views/admin/proposal/cartable-procurement-manager/components/Vendor";
import Supplier from "views/admin/proposal/cartable-procurement-manager/components/Supplier";
import { serviceProviderCompanyServices } from "services/serviceProviderCompanyServices";
import { vendorCompanyServices } from "services/vendorCompanyServices";
import { supplierCompanyServices } from "services/supplierCompanyServices";


const CompanyItem = ({ data, companyType, companyId }) => {

  const [currentRowSupplier, setCurrentRowSupplier] = useState({});
  const [currentRowVendor, setCurrentRowVendor] = useState({});
  const [currentRowServiceProvider, setCurrentRowServiceProvider] = useState({});
  const [parentLoading, setParentLoading] = useState(false);

  useEffect(() => {



    (async () => {
      setParentLoading(true)
      let resultSupplier = await supplierCompanyServices.getByCompanyId(companyId);
      setCurrentRowSupplier(resultSupplier.data);

      let resultVendor = await vendorCompanyServices.getByCompanyId(companyId);
      setCurrentRowVendor(resultVendor.data);

      let resultServiceProvider = await serviceProviderCompanyServices.getByCompanyId(companyId);
      setCurrentRowServiceProvider(resultServiceProvider.data);
      setParentLoading(false)
    })()

  }, [companyType]);



  return (
    <>

      {
        parentLoading == true ? <Spin className="spin-custom" /> :

          <>
            {companyType == "Supplier" && (currentRowSupplier.id != 0 && currentRowSupplier.id != undefined) ?
              <Supplier
                modal={false}
                parentLoading={false}
                currentData={currentRowSupplier}
                isModal={false}

              /> : null

            }


            {companyType == "Manufacture" && (currentRowVendor.id != 0 && currentRowVendor.id != undefined) ?
              <Vendor
                parentLoading={false}
                currentData={currentRowVendor}
                isModal={false}

              /> : null

            }

            {companyType == "ServiceProvider" && (currentRowServiceProvider.id != 0 && currentRowServiceProvider.id != undefined) ?
              <ServiceProvider
                parentLoading={false}
                currentData={currentRowServiceProvider}
                isModal={false}

              /> : null

            }
          </>

      }




    </>
  );

}

export default CompanyItem