import React, { useEffect, useRef, useState } from "react";
import Terms from "../../components/Terms/Terms";
import TextInput from "../../components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./signup.css";
import SelectInput from "../../components/SelectInput/SelectInput";
import RadioInput from "../../components/RadioInput/RadioInput";
import RadioGroupInput from "../../components/RadioInput/RadioGroupInput";
import Loader from "../../components/Loader/Loader";
import CompletionMessage from "../../components/CompletionMessage/CompletionMessage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../../components/ButtonContainer/ButtonContainer";
import ErrorContainer from "../../components/ErrorContainer/ErrorContainer";


const questions = [
  {
    id: 1,
    type: "first",
    text: "What is your first name?",
    isRequired: true,
  },
  {
    id: 2,
    type: "second",
    text: "and what is your last name, {name}?",
    isRequired: true,
  },
  {
    id: 3,
    type: "third",
    text: "Email you'd like to register with?",
    isRequired: true,
    subTitle:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    placeholder: "name@example.com",
    validation: "email",
    isLastQuestion:true
  },
  // {
  //   id: 4,
  //   type: "text",
  //   text: "Your phone number",
  //   isRequired: true,
  //   subTitle:
  //     "We won't call you unless it is absolutely required to process your application.",
  //   placeholder: "089621 8845",
  //   validation: "phone",
  // },
  // {
  //   id: 5,
  //   type: "text",
  //   text: "Create a password",
  //   isRequired: true,
  //   subTitle: "Make sure it's at least 8 characters long.",
  //   placeholder: "********",
  //   validation: "password",
  // },
  // {
  //   id: 6,
  //   type: "text",
  //   text: "Confirm your password",
  //   isRequired: true,
  //   subTitle: "Enter the same password as above.",
  //   placeholder: "********",
  //   validation: "confirmPassword",
  // },
  // {
  //   id: 7,
  //   type: "radio",
  //   text: "What is Your Gender?",
  //   isRequired: false,
  //   options: ["Male", "Female", "Other"],
  // },
  // {
  //   id: 8,
  //   type: "text",
  //   text: "Country",
  //   isRequired: false,
  // },
  // {
  //   id: 9,
  //   type: "text",
  //   text: "City",
  //   isRequired: false,
  // },
  // {
  //   id: 10,
  //   type: "radio-group",
  //   text: "I am",
  //   isRequired: true,
  //   options: [
  //     "Content Creator",
  //     "Artist",
  //     "Vlogger",
  //     "Gamer",
  //     "Brand",
  //     "Public figure",
  //     "Influrncer",
  //     "Developer/Designer",
  //     "Entrepreneur",
  //     "Chef",
  //     "Publisher",
  //     "Other",
  //   ],
  // },
  // {
  //   id: 11,
  //   type: "radio",
  //   text: "I make content related to",
  //   isRequired: true,
  //   options: [
  //     "Sports",
  //     "Food",
  //     "Photography",
  //     "Business",
  //     "Music",
  //     "Entertainment",
  //     "Other",
  //   ],
  //   isLastQuestion: true,
  // },
];

const isValidEmail = (email) => {
  let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(validRegex)) return true;

  return false;
};

const isValidPhoneNumber = (phone) => {
  let validRegex = /^\d{8,}$/;
  if (phone.match(validRegex)) return true;
  return false;
};

function SignUp() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("Please fill this in");
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const inputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");

  console.log(firstName,lastName,email,password,confirmPassword)

  const handleSignup = async () => {
    try {
      const signupData = {
        first_name: answers.find((a) => a.id === 1)?.value || "",
        last_name: answers.find((a) => a.id === 2)?.value || "",
        email: answers.find((a) => a.id === 3)?.value || "",
        phone: answers.find((a) => a.id === 4)?.value || "",
        password: answers.find((a) => a.id == 5)?.value || "",
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Signup successful",
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        console.log("Signup successful");
        setError("");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        // Handle unsuccessful signup
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError("An error occurred during signup");
    }
  };

  const updateCurrentQuestionNumber = (prevQuestionNumber, questionId) => {
    if (questionId > currentQuestionId) {
      return prevQuestionNumber + 1;
    } else if (questionId < currentQuestionId) {
      return prevQuestionNumber - 1;
    }
    return prevQuestionNumber;
  };

  const updateCurrentQuestionId = (questionId) => {
    setQuestionNumber((prevQuestionNumber) => {
      return updateCurrentQuestionNumber(prevQuestionNumber, questionId);
    });

    setCurrentQuestionId(questionId);
  };

  const handleAnswer = (answer, questionId) => {
    if (answer === null || answer === " " || answer.length === 0) {
      removeAnswer();
      return;
    }

    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion.validation === "phone" && isNaN(answer)) {
      const phoneElement = document.getElementById("text-input");
      phoneElement.classList.add("shake");

      setError("Numbers only please");
      setShowError(true);
      setTimeout(() => {
        phoneElement.classList.remove("shake");
        setShowError(false);
      }, 800);
      return;
    }

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const existingAnswer = newAnswers.find((a) => a.id === questionId);
      if (existingAnswer) {
        existingAnswer.value = answer;
      } else {
        newAnswers.push({
          id: questionId,
          type: questions.find((q) => q.id === questionId).type,
          value: answer,
        });
      }
      return newAnswers;
    });

    if (showError === true) {
      setShowError(false);
    }
  };

  const getCurrentQuestion = (question) => {
    let name = "";
    if (answers.find((a) => a.id === 1) !== undefined) {
      name = answers.find((a) => a.id === 1).value;
    }

    const questionText = question.text.replace("{name}", name);

    if (question.condition && !question.condition(answers)) {
      return null;
    }

    switch (question.type) {
      case "first":
        return (
          <>
            <div
              className="question-container"
              // id={question.validation === "phone" ? "text-input" : ""}
            >
              <div className="question-number-container">
                <label className="question-text">
                  {"First Name"}
                </label>
              </div>
              <div className="question-subtitle">
              </div>
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  value={firstName}
                  required
                />
              </div>

              {/* second input field */}
              <div className="question-number-container">
                <label className="question-text">
                  {"Last Name"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  value={lastName}
                />
              </div>
              <div className="question-number-container">
                <label className="question-text">
                  {"Email"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  
                  value={email}
                />
              </div>
              <div className="question-number-container">
                <label className="question-text">
                  {"Password"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  
                  value={password}
                />
              </div>
              <div className="question-number-container">
                <label className="question-text">
                  {"Confirm Password"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="password"
                  id="Confirmpassword"
                  onChange={(e) => setConfimPassword(e.target.value)}
                  placeholder="Confirm Password"
                  
                  value={confirmPassword}
                />
              </div>
              
              <div>{showError && <ErrorContainer error={error} />}</div>
              <div>
                {!showError && (
                  <ButtonContainer
                    buttonText={
                      question.isLastQuestion === true ? "Submit" : "OK"
                    }
                    showPressEnterText={
                      question.isLastQuestion === true
                        ? "Ctrl + Enter"
                        : "Enter"
                    }
                    showPressEnter={true}
                    // handleButtonClick={updateNextPage}
                  />
                )}
              </div>
            </div>
          </>
        );
        case "second":
        return (
          <>
            <div
              className="question-container"
              // id={question.validation === "phone" ? "text-input" : ""}
            >
              <div className="question-number-container">
                <label className="question-text">
                  {"First Name"}
                </label>
              </div>
              <div className="question-subtitle">
              </div>
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  
                  value={firstName}
                />
              </div>

              {/* second input field */}
              <div className="question-number-container">
                <label className="question-text">
                  {"Last Name"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  value={lastName}
                />
              </div>
              <div className="question-number-container">
                <label className="question-text">
                  {"Email"}
                </label>
              </div>
              
              <div>
                <input
                  // ref={inputRef}
                  className="text-input"
                  type="text"
                  id="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  
                  value={email}
                />
              </div>
              
              
              <div>{showError && <ErrorContainer error={error} />}</div>
              <div>
                {!showError && (
                  <ButtonContainer
                    buttonText={
                      question.isLastQuestion === true ? "Submit" : "OK"
                    }
                    showPressEnterText={
                      question.isLastQuestion === true
                        ? "Ctrl + Enter"
                        : "Enter"
                    }
                    showPressEnter={true}
                    // handleButtonClick={updateNextPage}
                  />
                )}
              </div>
            </div>
          </>
        );
      case "select":
        return (
          <SelectInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
          />
        );
      case "radio":
        return (
          <RadioInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
          />
        );
      case "radio-group":
        return (
          <RadioGroupInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
            maxSelections={question.maxSelect}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleShowError = (newError) => {
    setShowError(newError);
  };

  const removeAnswer = () => {
    let newAnswers = answers;
    let currAnsIndex = answers.findIndex((ans) => {
      return ans.id === currentQuestionId;
    });
    newAnswers.splice(currAnsIndex, 1);
    setAnswers([...newAnswers]);
  };

  // const isRequiredQuestionAnswered = () => {
  //   let currentQuestion = questions.find((q) => q.id === currentQuestionId);
  //   let currentAnswer = answers.find((a) => a.id === currentQuestionId);
  //   if (currentQuestion.isRequired !== true) return true;

  //   if (currentAnswer) {
  //     if (currentQuestion.type === "radio-group") {
  //       if (currentAnswer.value === null || currentAnswer.value.length === 0) {
  //         handleSetError("Oops! Please make a selection");

  //         removeAnswer();

  //         return false;
  //       } else if (currentAnswer.value.length < currentQuestion.maxSelect) {
  //         handleSetError("Please make more choices");
  //         return false;
  //       }
  //     } else if (
  //       currentAnswer.value === null ||
  //       currentAnswer.value.length === 0
  //     ) {
  //       if (currentQuestion.type === "text") {
  //         handleSetError("Please fill this in");
  //       } else {
  //         handleSetError("Please make a selection");
  //       }

  //       removeAnswer();
  //       return false;
  //     }

  //     if (currentQuestion.validation === "email") {
  //       if (isValidEmail(currentAnswer.value)) {
  //         return true;
  //       }

  //       handleSetError("Hmmm... that email doesn't look right");
  //       return false;
  //     }

  //     if (currentQuestion.validation === "phone") {
  //       if (isValidPhoneNumber(currentAnswer.value)) {
  //         return true;
  //       }

  //       handleSetError("Hmmm... that phone number doesn't look right");
  //       return false;
  //     }

  //     return true;
  //   }

  //   if (currentQuestion.type === "text") {
  //     handleSetError("Please fill this in");
  //   } else {
  //     handleSetError("Please make a selection");
  //   }
  //   return false;
  // };

  // const handleSetError = (newError) => {
  //   setError(newError);
  // };

  const checkIfLastQuestion = () => {
    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion.isLastQuestion) {
      setSubmitForm(true);
    }

    return;
  };

  if (loading) {
    return <Loader />;
  }

  if (submitForm) {
    // handleSignup();
  }
  return (
    <>
      <FullScroll
        // isRequiredQuestionAnswered={isRequiredQuestionAnswered}
        answers={answers}
        handleShowError={handleShowError}
        checkIfLastQuestion={checkIfLastQuestion}
        currentQuestionId={currentQuestionId}
      >
        {questions.map((question) => {
          return getCurrentQuestion(question);
        })}
      </FullScroll>
    </>
  );
}

export default SignUp;
