import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    axios.post("/teacher/forgot-password", { email }).then((res) => {
      const { question, message } = res.data;

      if (question) {
        setQuestion(question);
        setMessage("");
      } else {
        setMessage(message);
      }
    });
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    axios.post("/teacher/forgot-password", { email, answer, password }).then((res) => {
      setMessage(res.data.message);
    });
  };

  return (
    <div>
      
      {message && <p>{message}</p>}
      {question ? (
      <section>
      <div className="form_data">
          <div className="form_heading">
              <h1>Enter {question}</h1>
          </div>
    <form>
                            <div className="form_input">
                                <label htmlFor="email">Answer</label>
                                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} name="anser" id="anser" placeholder='Enter the Answer' />
                                <label htmlFor="email">New Password</label>
                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name="Password" id="Password" placeholder='Enter New Password' />
                            </div>
    
                            <button className='btn' onClick={handleAnswerSubmit}>Send</button>
                        </form>
    
                        </div>
                </section>
    ) : (
    
      <section>
      <div className="form_data">
          <div className="form_heading">
              <h1>Recover Password</h1>
          </div>
    <form>
                            <div className="form_input">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Enter Your Email Address' />
                            </div>
    
                            <button className='btn' onClick={handleEmailSubmit}>Send</button>
                        </form>
    
                        </div>
                </section>
    )}
    </div>
);
}

export default ForgotPassword;
