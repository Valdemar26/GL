window.onload = () => {
    let objectToHide,
        dragObject,
        mouseInitX,
        mouseInitY,
        figureIntiX,
        figureInitY,
        move = false,
        state;
    // event for X and 0
    let OnMouseDown = (e) => {
        let source, img;
        //checking the previous elem
        if(state)
        {
            if(state === e.target.getAttribute('id'))
            {
                alert('Follow rules')
                return;
            }
        }
        e.preventDefault();
        // getting coordinates
        mouseInitX = e.clientX;
        mouseInitY = e.clientY;

        figureIntiX = e.clientX - e.offsetX;
        figureInitY = e.clientY - e.offsetY;
        // creating some kind of wrapper over real block with image
        source = e.target.getAttribute('src');
        img = document.createElement("img");
        img.setAttribute("src", source);
        img.setAttribute("height", "80");
        img.setAttribute("width", "80");
        img.style.position = 'absolute';
        img.style.left = figureIntiX + "px";
        img.style.top = figureInitY + "px";
        img.id = 'drag';
        document.body.appendChild(img);

        dragObject = img;
        objectToHide = e.target;
        // hiding block with image
        objectToHide.style.visibility = "hidden";
        // allow move
        move = true;
    }

    document.body.addEventListener("mousemove", (e) => {
        if(move)
        {
            let deltaX = e.clientX - mouseInitX,
                deltaY = e.clientY - mouseInitY;

            dragObject.style.left = figureIntiX + deltaX + "px";
            dragObject.style.top = figureInitY + deltaY + "px";
        }
    })

    document.body.addEventListener('mouseup', (e) => {
        if(move)
        {
            let elem
            move = false;
            dragObject.style.visibility = "hidden";
            elem = document.elementFromPoint(e.clientX, e.clientY);
            dragObject.style.visibility = "visible";

            if(elem.classList.contains('cell'))
            {
                // adding image to table
                state = objectToHide.getAttribute('id');
                let img = document.createElement("img");
                img.setAttribute("src", dragObject.getAttribute('src'));
                img.setAttribute("height", "80");
                img.setAttribute("width", "80");
                elem.appendChild(img);
            }
            // show hidden elem
            objectToHide.style.visibility = "visible";
            document.body.removeChild(document.getElementById('drag'));
        }
    })

    // refresh button
    document.getElementById('refresh').addEventListener('click', () =>
    {
        state = undefined;
        Array.from(document.getElementsByClassName('cell')).forEach((element) => {
            element.innerHTML = '';
        });
    });
    // adding mousedown event handlers to images
    Array.from(document.getElementsByClassName('image')).forEach((element) => {
        element.addEventListener('mousedown', OnMouseDown);
    });
}
