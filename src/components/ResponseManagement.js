import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const ResponseManagement = ({ jobId }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          // Handle the case where the user is not logged in
          return;
        }

        // Fetch responses for the specific job listing and user
        const responsesQuery = await firestore
          .collection('applications')
          .where('jobId', '==', jobId)
          .where('applicantUid', '==', user.uid)
          .get();

        const responsesData = responsesQuery.docs.map((doc) => doc.data());
        setResponses(responsesData);
      } catch (error) {
        console.error('Error fetching responses:', error.message);
        // Handle error, show error message, etc.
      }
    };

    fetchResponses();
  }, [jobId]);

  return (
    <div>
      <h2>Responses for Job Listing</h2>
      {responses.length > 0 ? (
        <ul>
          {responses.map((response, index) => (
            <li key={index}>
              <p>Applicant Name: {response.applicantName}</p>
              <p>Applicant Email: {response.applicantEmail}</p>
              <p>Resume/CV: {response.applicantResume}</p>
              <p>Applied At: {response.appliedAt.toDate().toLocaleString()}</p>
              {/* Display other response details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default ResponseManagement;
