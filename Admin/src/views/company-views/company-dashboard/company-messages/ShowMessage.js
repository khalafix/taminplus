import React from 'react'
import { CPEditor } from "components/CP";
import { userMessageService } from "services/userMessage/userMessageService";

export const ShowMessage = ({messageData, id}) => {

  const updateMessageVisited = async () => {
    await userMessageService.updateMessageStatus(id);
 }

  React.useEffect(() => {
    if(id)
    {
      updateMessageVisited();
    }
  }, [])
  
  
  return (
    <>
    <CPEditor initialValue={messageData} readonly={true} rows={30}/>
    </>
  )
}
