import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // For Timeslot booking after the quiz
  const [doctor, setDoctor] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const [date, setDate] = useState('');
  const [disease, setDisease] = useState(''); // New state for disease

  const navigate = useNavigate();
  // const [patientName, setPatientName] = useState(""); // New state for patient name
// const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number

  // Sample IDs for patient, hospital, and doctor (replace as needed)
  const patientId = 1; 
  const hospitalId = 1; 
  const doctorId = doctor;

  // Questions and answers structured like the decision tree
  const questions = [
    {
      question: "What symptom(s) are you experiencing?",
      options: [
        { text: "Fever", score: 2, next: 1 },
        { text: "Chest pain", score: 3, next: 9 },
        { text: "Headache", score: 2, next: 12 },
        { text: "Diarrhea", score: 1, next: 17 },
      ],
    },
    {
      question: "How high is your fever?",
      options: [
        { text: "Below 102.2°F", score: 2, next: 2 },
        { text: "Above 102.2°F", score: 3, next: 2 },
      ],
    },
    {
      question: "How long have you had the fever?",
      options: [
        { text: "Less than 2 days", score: 1, next: 3 },
        { text: "2-5 days", score: 2, next: 3 },
        { text: "More than 5 days", score: 3, next: 5 },
      ],
    },
    {
      question: "Have you taken any medication?",
      options: [
        { text: "Yes", score: 1, next: 4 },
        { text: "No", score: 0, next: 7 },
      ],
    },
    {
      question: "Did the medication reduce the fever?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 0, next: 7 },
      ],
    },
    {
      question: "Have you had recent contact with someone with similar symptoms?",
      options: [
        { text: "Yes", score: 3, next: 7 },
        { text: "No", score: 0, next: 7 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Cough", score: 2, next: 8 },
        { text: "Sore throat", score: 1, next: 11 },
        { text: "Fatigue", score: 2, next: 14 },
      ],
    },
    {
      question: "What type of cough do you have?",
      options: [
        { text: "Dry", score: 1, next: 8 },
        { text: "Productive", score: 2, next: 8 },
      ],
    },
    {
      question: "What color is your mucus?",
      options: [
        { text: "Clear", score: 1, next: null },
        { text: "Yellow", score: 2, next: null },
        { text: "Green", score: 3, next: null },
        { text: "Bloody", score: 3, next: null },
      ],
    },
    // Chest Pain Path
    {
      question: "How long have you had chest pain?",
      options: [
        { text: "Less than 2 days", score: 1, next: 10 },
        { text: "2-5 days", score: 2, next: 10 },
        { text: "More than 5 days", score: 3, next: 10 },
      ],
    },
    {
      question: "Do you have any other symptoms with chest pain?",
      options: [
        { text: "Shortness of breath", score: 3, next: 11 },
        { text: "Cough", score: 2, next: 7 },
        { text: "Dizziness", score: 2, next: 12 },
      ],
    },
    {
      question: "How severe is your shortness of breath?",
      options: [
        { text: "Mild", score: 1, next: null },
        { text: "Moderate", score: 2, next: null },
        { text: "Severe", score: 3, next: null },
      ],
    },
    // Headache Path
    {
      question: "How severe is your headache?",
      options: [
        { text: "Mild", score: 1, next: 13 },
        { text: "Moderate", score: 2, next: 13 },
        { text: "Severe", score: 3, next: 13 },
      ],
    },
    {
      question: "How long have you had this headache?",
      options: [
        { text: "Less than 2 days", score: 1, next: 14 },
        { text: "2-5 days", score: 2, next: 14 },
        { text: "More than 5 days", score: 3, next: 14 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Nausea", score: 2, next: 15 },
        { text: "Blurred vision", score: 3, next: 15 },
        { text: "Dizziness", score: 2, next: 15 },
      ],
    },
    {
      question: "Have you taken any medication for the headache?",
      options: [
        { text: "Yes", score: 1, next: 16 },
        { text: "No", score: 0, next: 16 },
      ],
    },
    {
      question: "Did the medication reduce the headache?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 0, next: null },
      ],
    },
    // Diarrhea Path (Fixed Unbounded Loop)
    {
      question: "How long have you had diarrhea?",
      options: [
        { text: "Less than 2 days", score: 1, next: 18 },
        { text: "2-5 days", score: 2, next: 18 },
        { text: "More than 5 days", score: 3, next: 19 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Stomach pain", score: 2, next: null },
        { text: "Nausea", score: 2, next: null },
        { text: "Fatigue", score: 2, next: 23 },
      ],
    },
    {
      question: "Have you taken any medication for diarrhea?",
      options: [
        { text: "Yes", score: 1, next: 20 },
        { text: "No", score: 0, next: 20 },
      ],
    },
    {
      question: "Did the medication reduce the diarrhea?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 0, next: null },
      ],
    },
    {
      question: "Have you had recent contact with someone with similar symptoms?",
      options: [
        { text: "Yes", score: 3, next: null },
        { text: "No", score: 0, next: null },
      ],
    },
    // Fatigue Path
    {
      question: "How severe is your fatigue?",
      options: [
        { text: "Mild", score: 1, next: null },
        { text: "Moderate", score: 2, next: null },
        { text: "Severe", score: 3, next: null },
      ],
    },
    // Additional questions follow the same format
  ];


  const handleAnswerClick = (option) => {
    setScore(score + option.score);

    // Update the disease state if the user is answering the first question
    if (currentQuestionIndex === 0) {
      setDisease(option.text); // Set the disease based on the selected symptom
    }

    if (option.next !== null) {
      setCurrentQuestionIndex(option.next);
    } else {
      setQuizComplete(true);
    }
  };


  const handleBooking = async (e) => {
    e.preventDefault();

    // Validate form input
    if (!doctor || !timeslot || !date) {
      alert('Please select a doctor, date, and time slot.');
      return;
    }
    // console.log(questions[0].options[currentQuestionIndex]?.text)
    // Prepare data for the POST request
    const appointmentData = {
      patientId,
      hospitalId,
      doctorId,
      selectedTimeSlot: timeslot,
      priorityRating: score, // assuming score determines priority
      date,
      disease, // use the state variable `disease` here
    };

    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Appointment created:', data);
        alert('Appointment successfully booked.');
        navigate('/Confirmed');
      } else {
        const error = await response.json();
        console.error('Failed to create appointment:', error);
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the appointment.');
    }
  };

  if (quizComplete) {
    return (
      <div className="w-full h-fit flex justify-center items-center">
        <div className="bg-slate-50 w-5/12 h-11/12 shadow-2xl rounded-md text-center mt-24">
          <div className="mt-6 p-2">
            <h2 className="text-2xl font-bold">Book a Slot for Consultation</h2>
            <form className="mt-4" onSubmit={handleBooking}>
            <label className="block text-left">
  Patient Name:
  <input
    type="text"
    className="mt-2 p-2 border border-gray-400 rounded-md w-full"
    // value={patientName}
    // onChange={(e) => setPatientName(e.target.value)}
    placeholder="Enter your name"
    required
  />
</label>

<label className="block text-left mt-4">
  Phone Number:
  <input
    type="tel"
    className="mt-2 p-2 border border-gray-400 rounded-md w-full"
    // value={phoneNumber}
    // onChange={(e) => setPhoneNumber(e.target.value)}
    placeholder="Enter your phone number"
    required
  />
</label>
              <label className="block text-left pt-2">
                Select Doctor:
                <select
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value="" disabled>
                    Select your Doctor
                  </option>
                  <option value="1">Dr. Ashad Sivaraman</option>
                  <option value="2">Dr. Mahadevan.K</option>
                  <option value="3">Dr. Swapna Nair</option>
                  <option value="4">Dr. Anoop Sivaraman</option>
                  <option value="5">Dr. Harshali Yadav</option>
                  <option value="6">Dr. Anila George</option>
                  <option value="7">Dr. Pinki</option>
                  <option value="8">Dr. Aiswaria</option>
                </select>
              </label>
              <label className="block text-left mt-4">
                Select Date:
                <input
                  type="date"
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="block text-left mt-4">
                Select Time Slot:
                <select
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={timeslot}
                  onChange={(e) => setTimeslot(e.target.value)}
                >
                  <option value="" disabled>
                    Select time slot
                  </option>
                  <option value="09-10">9 AM - 10 AM</option>
                  <option value="10-11">10 AM - 11 AM</option>
                  <option value="11-12">11 AM - 12 PM</option>
                  <option value="14-15">2 PM - 3 PM</option>
                  <option value="15-16">3 PM - 4 PM</option>
                </select>
              </label>
              <button
                className="mt-3 mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                type="submit"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="bg-slate-50 w-11/12 mt-12 rounded-md  pt-40">
      <div className="w-6/12 h-auto shadow-xl mx-auto mt-16 p-6 flex flex-col items-center justify-center rounded-2xl hover:shadow-2xl">

          <h1 className="text-2xl font-bold text-center align-top">
            {currentQuestion.question}
          </h1>

          <hr
            style={{
              border: 'none',
              borderTop: '4px solid black',
              width: '50%',
              margin: '20px auto',
            }}
          />

<div className="grid grid-cols-2 gap-4 pt-5 place-items-center w-full">


            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="border shadow-sm hover:bg-blue-400 mx-2 font-semibold w-44 h-12 rounded-2xl mt-2"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;