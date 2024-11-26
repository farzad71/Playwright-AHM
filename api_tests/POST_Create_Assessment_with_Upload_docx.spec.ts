import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';
import { faker } from '@faker-js/faker';

let asseesmentName = faker.company.buzzPhrase();
let customerProfileID: string;
let organizationGroupID: string;
let pdfHandbookID: string;
let docxHandbookID: string;
let lossePolicyID: string;


test.describe('Create Customer Assessment with Upload file', () => {
  test('Get All Users Organization Group id @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/customers`);
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
   
    //Collecting default organization groupid
    responseBody.data.organizationGroups.find((x:any) => {
      if (x.isDefault === true) {
        organizationGroupID =x.organizationGroupId;
      }
    });
  });
  test('Fetch customer profile id using organization group id @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerprofiles`);
    const responseBody = JSON.parse(await response.text());
    
    //Collect customer Profile id
    customerProfileID = responseBody.items.find((x:any) => x.data.name === "Regression Test Profile");
    //Store in the local variable customerProfileID
    customerProfileID = customerProfileID.id;
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
 
  
  });

  test('Fetch handbook ids using customer vipper guide @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/customerhandbooks`);
    const responseBody = JSON.parse(await response.text());
    
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
    //find the pdf handbook id 
    pdfHandbookID = responseBody.items.find((x:any) => x.data.fileType === 'pdf' && x.data.documentCategory ==='Handbook')
    pdfHandbookID = pdfHandbookID.id
  
    //find the docx handbook id 
    docxHandbookID = responseBody.items.find((x:any) => x.data.fileType === 'docx' && x.data.documentCategory ==='Handbook')
    docxHandbookID = docxHandbookID.id
    //find the loosepolicy id
    lossePolicyID = responseBody.items.find((x:any) => x.data.documentCategory ==='LoosePolicy')
    lossePolicyID = lossePolicyID.id
  
  });
  test('Create Assessment with Uploaded word doc @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.post(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerassessments?includePolicyStatistics=false`,
      {
        data:{
            assessments: [
                {
                  type: 'WithUpload',
                  customerProfile: `${customerProfileID}`,
                  name: `Create Suppliment API ${asseesmentName}`,
                  handbooks: [
                    {
                      handbookId: `${docxHandbookID}`,
                      jurisdictionCodes: [
                        'NJ'
                      ]
                    }
                  ],
                  jurisdictionCodes: ['USFED']
                }
              ]
        }
      }
    );

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });
 });
