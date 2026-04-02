import { useState } from "react";
import styles from "./Contact.module.css";

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
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>Email</label>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="you@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className={styles.label}>Subject</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)}
                />
                <label className={styles.label}>Message</label>
                <textarea
                    className={styles.textarea}
                    rows="5"
                    placeholder="Enter message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className={styles.button} type="submit">Send</button>
            </form>
        </div>
    );

}

export default Contact;