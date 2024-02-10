
const cron = require('node-cron');
const Task = require('../models/task.models');
const User = require('../models/signup.models');
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
require("dotenv").config()

// Schedule the cron job to run every hour
cron.schedule('0 * * * *', async () => {
    try {
        // Find tasks that have passed their due dates
        const overdueTasks = await Task.find({ due_date: { $lt: new Date() } });
        
        // Iterate over overdue tasks
        for (const task of overdueTasks) {
            const user = task.user;
       
            const userDetails = await User.findById(_id); 
console.log(user);
            // Fetch the expected priority from the user table
            const expectedPriority = userDetails.priority;
            
            // Call the user if their priority matches the expected priority
            if (userDetails && userDetails.priority === expectedPriority) {
                await callUser(userDetails.phoneNumber); // Pass userDetails.phoneNumber to callUser function
                console.log('Call initiated to:', userDetails.phoneNumber);
                break; // Break the loop after initiating the call
            }
        }
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

// Define callUser function
let callUser = async (phoneNumber) => {
    try {
        await client.calls.create({
            url: 'https://handler.twilio.com/twiml/EHedddf19b86288ad06f8ae81bfad469bb', // URL to TwiML document for handling the call
            to: phoneNumber,
            from: '+1 213 642 1181'
            
        });
        console.log(phoneNumber);
    } catch (error) {
        console.error('Error calling user:', error);
    }
}

module.exports = callUser;



