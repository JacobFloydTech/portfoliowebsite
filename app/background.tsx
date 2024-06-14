'use client'
import { useEffect, useRef } from "react";

export default function Background() {
    useEffect(() => { 
        setUpGrid();
        let angle = 0;
        const updateAngle = () => {
                document.body.style.setProperty('--rotateLogoBackground', `${angle}deg`);
                angle += 0.5;
                requestAnimationFrame(updateAngle);
        };
        updateAngle();
        addDelays();
        window.addEventListener('resize', setUpGrid)
        return () => window.removeEventListener('resize', setUpGrid)
 
    }, [])
    const setUpGrid = () => { 
        const el = document.getElementById('customGrid');
   
        if (!el) { return; }
        let col = Math.ceil(document.documentElement.clientWidth /80);

        let row = Math.ceil(document.documentElement.scrollHeight/ 78);
    
        for (var i = 0; i < col; i++) { 
            for (var j = 0; j < row; j++) {
                const squareElemeent = document.createElement('div');
                squareElemeent.classList.add('square');
                el.appendChild(squareElemeent);
            }
        }
        addDelays();
    }
    const addDelays = () => { 
        const element = document.getElementById('customGrid');
        if (!element) { return}
        const cols = getComputedStyle(element).gridTemplateColumns.split(" ").length;
        const children = Array.from(element.children);
        for (var i = 0; i < children.length; i++) { 
            const x = i % cols;
            const y = Math.floor(i / cols);
            const delay = Math.sqrt((x*y) / 5) / 2.5;
            (children[i] as HTMLElement).style.animationDelay = `${delay}s`
            children[i].setAttribute('id', `${x},${y}`)
        } 
    }



    return (
        <div id='backgroundContainer' className="overflow-x-hidden relative h-full w-screen">
            <div className=" w-full absolute background h-full -z-20" />
            <div className="fadeBackground z-50"/>
            <div id='customGrid' className="customGrid overflow-hidden w-[120vw] md:w-[110vw] lg:w-[105vw] xl:w-[105vw]  top-0 -translate-y-1  p-0 m-0 mx-auto"/>
        
            
        </div>

    );
}