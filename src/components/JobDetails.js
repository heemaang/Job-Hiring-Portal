import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router
import { firestore } from '../firebase';

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDoc = await firestore.collection('jobs').doc(jobId).get();

        if (jobDoc.exists) {
          setJobDetails(jobDoc.data());
        } else {
          // Handle case where the job doesn't exist
        }
      } catch (error) {
        console.error('Error fetching job details:', error.message);
        // Handle error, show error message, etc.
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div>
      {jobDetails ? (
        <div>
          <h2>{jobDetails.jobTitle}</h2>
          <p>{jobDetails.jobDescription}</p>
          <p>{jobDetails.jobRequirements}</p>
          {/* Display other job details as needed */}
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default JobDetails;
