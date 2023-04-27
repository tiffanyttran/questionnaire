import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const QuestionnaireResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Initialize AWS SDK
    AWS.config.update({
      accessKeyId: 'YOUR_ACCESS_KEY',
      secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      region: 'YOUR_AWS_REGION',
    });

    // Create DynamoDB instance
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    // Fetch questionnaire responses from DynamoDB
    const fetchResponses = async () => {
      try {
        const params = {
          TableName: 'QuestionnaireResponses',
        };

        const data = await dynamoDB.scan(params).promise();
        setResponses(data.Items);
      } catch (error) {
        console.error('Error fetching questionnaire responses:', error);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div>
      <h1>Questionnaire Responses</h1>
      {responses.map((response) => (
        <div key={response.responseId}>
          <h3>{response.question}</h3>
          <p>{response.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireResponses;
