import { useState } from "react";

function Contact() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log(email);
        console.log(subject);
        console.log(message);
    }

    return (
        <div>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="you@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Subject</label>
                <input
                    type="text"
                    placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)}
                />
                <br />
                <label>Message</label>
                <textarea
                    rows="5"
                    placeholder="Enter message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br />
                <button type="submit">Send</button>
            </form>
        </div>
    );

}

export default Contact;