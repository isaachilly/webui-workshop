import { expect } from 'chai';
import ApplicationService from '../lib/ApplicationService.js'; // adjust path as needed

describe('ApplicationService', () => {
  let appService;

  beforeEach(() => {
    appService = new ApplicationService();
  });

  it('should be initialized', () => {
    expect(appService).to.exist;
    expect(appService.details).to.exist;
  });

  it('getDetails() should return the expected details JSON object', async () => {
    const expectedDetails = {
      appName: '2-3-4 Exercises Application',
    };

    const returnedData = await appService.getDetails();

    expect(returnedData).to.deep.equal(expectedDetails);
  });
});
