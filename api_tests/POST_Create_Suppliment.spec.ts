import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';
import { faker } from '@faker-js/faker';

let asseesmentName = faker.company.buzzPhrase();
let customerProfileID: string;
let organizationGroupID:[] = [];


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
  test('Create suppliment @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.post(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerassessments?includePolicyStatistics=false`,
      {
        data:{
            assessments: [
                {
                  type: 'WithoutUpload',
                  customerProfile: `${customerProfileID}`,
                  name: `Create Suppliment API ${asseesmentName}`,
                      jurisdictionCodes: [
                        'NJ'
                      ]
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
