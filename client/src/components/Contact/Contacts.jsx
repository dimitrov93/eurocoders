import React, { useRef, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./contacts.css";
import emailjs from 'emailjs-com';
import { sendEmailService } from "../../services/emailService";


const Contacts = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      await sendEmailService(name, email, message);
      await emailjs.sendForm(
        "service_k4ilrce",
        "template_9qoxwnh",
        form.current,
        "4TajOj_csladDDh56"
      );
      setMessage(`Thank you, ${name}! Message has been sent!`);
      setIsMessageVisible(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      setMessage("Oops, something went wrong. Please try again later.");
      setIsMessageVisible(true);
    } finally {
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);
    }
  };


  return (
    <div className="container max_height">
      <div>
        <h1 className="contacts__header">Свържете се с нас на</h1>
      </div>
      <div className="contacts__container">
        <div className="contacts__img"></div>

        <div className="contacts__information">
          <p className="contacts__information_item">
            <BsPhone className="contacts__icons" />
            <span>Телефон</span> +359 111 222 333{" "}
          </p>
          <p className="contacts__information_item">
            <AiOutlineMail className="contacts__icons" /> <span>Емайл</span>
            ts.dimitrov@gmail.com
          </p>
          <p className="contacts__information_item">
            Присъединете се:
            <Link to={"https://www.facebook.com"}>
              Facebook: <FaFacebookF color="#3b5998" />{" "}
            </Link>
            <Link to={"https://instagram.com"}>
              Instagram: <FaInstagram className="instagram" />
            </Link>
          </p>
        </div>

        <div className="contacts__separator"></div>

        <div className="contacts__email">
          <p>
            Може да ни изпратите директно съобщение на емайл през нащата форма:
          </p>

          <form ref={form} onSubmit={sendEmail}>
            <div className="email__input">
              <input type="text" placeholder="Име:" name="name" required />
            </div>
            <div className="email__input">
              <input type="email" placeholder="Емайл:" name="email" required />
            </div>

            <div className="email__input">
              <textarea
                rows="7"
                type="text"
                placeholder="Съобщение:"
                name="message"
                required
              ></textarea>
            </div>
            {isMessageVisible && <p className='message'>{message}</p>}
            <button type="submit" className="email__btn">Send now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
