import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';
import { faker } from '@faker-js/faker';

let asseesmentName = faker.company.name();
let customerProfileID: string;
let organizationGroupID:[] = [];

test.describe('create and delete cutomer profile', () => {
  test('Get Organization Groups - Based of auth @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/organizationgroup`);
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.items[0].data.organizationGroupId).toBeTruthy();

    //Collecting default organization groupid
    responseBody.items.forEach((x:any) => {
      if (x.data.isDefault === true) {
        organizationGroupID.push(x.data.organizationGroupId);
      }
    });
  });

  test('Create Customer Profile using ORG_GROUP_ID was collected from Get customers API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.post(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerprofiles?orgnizationGroupId`,
      {
        data: {
          name: `New Profile ${asseesmentName}`,
          paidVacationOffered: true,
          employmentOfMinors: true,
          jurisdictionProfiles: [
            {
              jurisdictionCode: 'AR',
              isLocal: false,
              employeeCount: '10',
              hasEmployees: true,
              hasPhysicalOperations: false,
            },
            {
              jurisdictionCode: 'MO',
              isLocal: false,
              employeeCount: '6',
              hasEmployees: true,
              hasPhysicalOperations: false,
            },
            {
              jurisdictionCode: 'NJ',
              isLocal: false,
              employeeCount: '16',
              hasEmployees: true,
              hasPhysicalOperations: false,
            },
          ],
        },
      }
    );

    const responseBody = JSON.parse(await response.text());
    customerProfileID = responseBody.id;
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });
  test('Delete Customer Profile using Customer Profile ID collect from create profile API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.delete(
      `${apiBaseURL}/v2/customerprofiles/${customerProfileID}`
    );

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });
});
