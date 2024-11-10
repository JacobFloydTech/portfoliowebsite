import { useEffect } from "react";
import Background from "./background";
import ExampleWebsites from "./exampleWebsites";
import Portfolio from "./portfolio";
import Skills from "./skills";
import ContactForm from "./contactForm";
import SpacePage from "./space";

export default function Page() { 
    return ( 
        <div className="h-auto absolute ">
            <div className=" fixed h-full -z-50">
                <SpacePage/>
            </div>
            <Portfolio />
            <ExampleWebsites />
            <Skills/>
            <ContactForm/>
        </div>
    )
}
