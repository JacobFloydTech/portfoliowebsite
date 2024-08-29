'use client'
import { useState } from "react"
import { SendMail } from "./mailFunction"

type res = { 
    message: string,
    error: boolean,
}

type contactInformation = {
    email: string | null,
    phoneNumber: string | null,
}

export default function ContactForm() { 
    const [name, setName] = useState<string | null>(null);
    const [contact, setContact] = useState<contactInformation>({email: null, phoneNumber: null});
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<res | null>(null);

    const submit = async() => { 
        setLoading(true);
        if (name == null|| message == null || !Object.values(contact).some(e => e)) { 
            setLoading(false);
            setResponse({
                message: "Error: Please complete the required fields!",
                error: true,
            })
            setTimeout(() => {setResponse(null)}, 1700);
            return;
        }
        const response = await SendMail(name, contact.email, contact.phoneNumber, message);
        setResponse({
            message: response ? "500 Internal Error: Something went wrong" : "Message Sent!",
            error: false,
        })
        setLoading(false);
        setTimeout(() => {setResponse(null)}, 1700);

        
    }
    return ( 
        <div className="flex bg-gray-200 rounded-xl bg-opacity-10 backdrop-blur-sm text-center items-center justify-around py-12 flex-col w-full md:w-1/2 2xl:w-1/3 mx-auto mb-12 text-white">
            <h1 className="font-bold text-2xl">Get in contact with me!</h1>
            <div className="text-left font-bold font-xl flex w-3/4 md:w-2/3  flex-col my-2 space-y-1">
                <h2>Name</h2>
                <input onChange={(e) => setName(e.target.value)} className="outline-none p-2 xl:p-1 text-xs md:text-sm xl:text-base w-full font-normal p-1 rounded-md text-black"/>
            </div>
            <div className="text-left font-bold font-xl flex flex-col w-3/4 md:w-2/3  my-2 space-y-1">
                <p>Contact information (Only one is required)</p>
                <div className="flex space-x-4">
                    <input placeholder="Email" onChange={(e) => setContact(prev => ({...prev, email: e.target.value}))} className="outline-none p-2 xl:p-1 text-xs md:text-sm xl:text-base w-full font-normal p-1 rounded-md text-black"/>
                    <input placeholder="Phone Number" type="number"  onChange={(e) => setContact(prev => ({...prev, phoneNumber: e.target.value}))} className="outline-none p-2 xl:p-1 text-xs md:text-sm xl:text-base w-full font-normal p-1 rounded-md text-black"/>
                </div>
            </div>
            <div className="text-left font-bold font-xl flex flex-col w-3/4 md:w-2/3  my-2 space-y-1">
                <h2>Message Content</h2>
                <textarea onChange={(e) => setMessage(e.target.value)} className="outline-none p-2 xl:p-1 text-xs md:text-sm xl:text-base w-full font-normal p-1 rounded-md text-black"/>
            </div>
            <div className="flex-col flex md:flex-row items-center justify-center space-y-2 mt-4 text-xl md:space-y-0 md:text-lg  md:space-x-4">
                <button disabled={loading} onClick={submit} className="rounded-full transition-all hover:scale-105 duration-100 px-4 py-2 border-2 border-white bg-black my-3">
                    {loading ? <Loading/> : <p>Send Message</p>}
                </button>
                <a className="cursor rounded-full transition-all hover:scale-105 duration-100 px-4 py-2 border-2 border-white bg-black" href="Jacob_CV.pdf" download={'Jacob_CV.pdf'}>Download CV</a>
            </div>
            {response != null &&
                <p className={`text-white font-bold mt-4 px-4 py-2 rounded-full border-black border-2 w-2/3 text-lg ${response.error ? "bg-red-500" : "bg-green-500"}`}>{response.message}</p>
            }
        </div>
    )
}

function Loading() { 
    return ( 
        <div className="w-8 h-8">
            <svg id="loading" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="white" stroke-width="3.55556" stroke-linecap="round"></path> </g></svg>
        </div>
    )
}