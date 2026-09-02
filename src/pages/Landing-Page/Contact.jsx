import React from "react";
import { useState } from "react";

function Contact() {
  const [email, setemail] = useState("");
    const [name, setname] = useState("");
      const [message, setmessage] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const loginData = {  email, name, message};
        console.log("Login Data:", loginData);
        
        setemail("");
        setname("");
        setmessage("");
      };
  return (
   <div className="  min-h-screen bg-[#030712] relative flex items-center justify-center">
          {/* Glowing effect */}
          <div className="absolute top-[23%] w-[36vw] h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-60 rounded-full z-0" />
          
         <div className="relative bg-[#10141E] shadow-lg rounded-xl p-8 w-[50vw] h-[40vw] z-10">
           <h2 className="text-2xl text-white font-bold mb-3 text-center">We'd love to hear from you</h2>
           <p className="mb-4">Have a suggestion? Found a bug? Delete your account/data? Fill out the form below, and we'll take a look!</p>
           <form className="space-y-6" onSubmit={handleSubmit}>
               <input
                 type="email"
                 onChange={(e)=>setemail(e.target.value)}
                 value={email}
                 className="w-full border p-2 rounded-md outline-none bg-[#1C2029] border-none"
                 placeholder="Enter your Email"
                 required
               />

              <input  
                 type="text"
                 onChange={(e) => setname(e.target.value)}
                 value={name}
                 className="w-full border p-2 rounded-md outline-none bg-[#1C2029] border-none"
                 placeholder="Enter your Name"
                 required
               />
             
             <textarea
                onChange={(e) => setmessage(e.target.value)}
                value={message}
                className="w-full h-[13vw] border p-2 rounded-md outline-none bg-[#1C2029] border-none resize-y"
                placeholder="Message"
                required
              />
     
           
             <button
               type="submit"
               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
             >
               Submit
             </button>

           </form>
         </div>
       </div>
  )
}

export default Contact
