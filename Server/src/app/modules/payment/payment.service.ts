/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import { readFileSync } from 'fs';
import { verifyPayment } from '../../utils/payment';
import { User } from '../User/user.model';
import { USER_STATUS } from '../User/user.constant';

const confirmationService = async (transactionId: string, status: string) => {
  let result;
  let message = '';
  if (status === 'success') {
    const verifyResponse = await verifyPayment(transactionId);
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
      result = await User.findOneAndUpdate(
        { transactionId },
        {
          paymentStatus: 'Paid',
          status: USER_STATUS.PREMIUM,
          isVerified: true,
        },
        {
          new: true,
        },
      )
      message = 'Successfully Paid!';
    } else {
      message = 'Payment Verification Failed!';
    }
  }
  if (status === 'failed') {
    message = 'Payment Failed!';
  }
  
  const filePath = join(__dirname, '../../../../confirmation.html');
  let template = readFileSync(filePath, 'utf-8');
  
  template = template.replace('{{message}}', message);
  
  return template;
  };
export const paymentServices = {
  confirmationService,
};


