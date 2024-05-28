document.addEventListener('DOMContentLoaded', function () {
    // Event listener for file upload
    document.getElementById('fileUpload').addEventListener('change', handleFileSelect);

    // Event listeners for drag and drop area
    var dropArea = document.getElementById('upload-prompt');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    // Function to prevent default behaviors
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Function to highlight drop area
    function highlight(e) {
        dropArea.classList.add('border', 'border-secondary');
    }

    // Function to remove highlight from drop area
    function unhighlight(e) {
        dropArea.classList.remove('border', 'border-secondary');
    }

    // Function to handle file drop
    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;
        handleFiles(files);
    }

    // Function to handle file selection from input
    function handleFileSelect(event) {
        var files = event.target.files;
        handleFiles(files);
    }

    // Function to handle selected files
    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.onload = function (e) {
                var previewImage = document.getElementById('uploaded-image');
                previewImage.src = e.target.result;
                document.getElementById('image-container').style.maxWidth = '100%'; // Set max width to 100%
                document.getElementById('image-container').style.maxHeight = '100%'; // Set max height to 100%
                previewImage.style.maxWidth = '100%'; // Set max width to 100%
                previewImage.style.height = 'auto'; // Maintain aspect ratio

                var cardBody = document.querySelector('.card-body');
                cardBody.style.padding = '0';

                document.getElementById('image-container').style.display = 'block';
                document.getElementById('upload-prompt').style.display = 'none';
                document.getElementById('createNewPostHeader').style.display = 'none';

                var cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header', 'text-center', 'bg-white', 'd-flex', 'justify-content-between', 'align-items-center');
                cardHeader.style.padding = '0.5rem'; // Add padding to the header

                // Create the back SVG icon
                var backIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                backIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                backIcon.setAttribute("viewBox", "0 0 24 24");
                backIcon.setAttribute("width", "24");
                backIcon.setAttribute("height", "24");
                backIcon.setAttribute("fill", "rgba(184,184,184,1)");
                backIcon.classList.add('back-icon'); // Add a class if needed

                // Create the path element inside the SVG for the arrow
                var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z");

                // Append the path to the SVG
                backIcon.appendChild(path);

                // Add click event listener to the back icon
                backIcon.addEventListener('click', showDiscardPostCard);

                // Append the back SVG icon to the card header
                cardHeader.appendChild(backIcon);

                // Add text "Crop" aligned to center
                var headerText = document.createElement('div');
                headerText.textContent = 'Crop';
                headerText.style.verticalAlign = 'middle';
                headerText.style.fontSize = '0.8rem'; // Adjust font size
                headerText.style.marginRight = '0.8rem'; // Push the next link to the right

                // Add next link with text "Next"
                var nextLink = document.createElement('a');
                nextLink.href = '#'; // Set href attribute
                nextLink.style.color = 'blue'; // Set color
                nextLink.style.textDecoration = 'none'; // Remove text decoration
                nextLink.textContent = 'Next'; // Add text "Next"
                nextLink.style.fontSize = '0.8rem'; // Adjust font size

                // Add click event listener to the next link
                nextLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the link
                    expandDialog(); // Call the expandDialog function
                });

                cardHeader.appendChild(headerText);
                cardHeader.appendChild(nextLink);

                // Insert card header before the card body
                var card = document.querySelector('.card');
                card.insertBefore(cardHeader, card.firstChild);
            };

            reader.readAsDataURL(file);
        }
    }

    // Function to show the discard post dialog box
    function showDiscardPostCard() {
        // Create a div for the discard post dialog box
        var discardDialog = document.createElement('div');
        discardDialog.classList.add('discard-dialog', 'card', 'position-absolute', 'w-100', 'bg-white', 'text-dark', 'p-0', 'pb-2', 'rounded-lg', 'shadow-lg', 'm-0');
        discardDialog.style.top = '50%';
        discardDialog.style.left = '50%';
        discardDialog.style.borderRadius = '100%';
        discardDialog.style.transform = 'translate(-50%, -50%)';
        discardDialog.style.zIndex = '9999'; // Set a high z-index to appear over existing dialog

        // Create card header for the dialog box
        var cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'text-center', 'bg-white', 'text-dark', 'font-weight-50', 'pb-0', 'text-sx');
        cardHeader.textContent = 'Discard Post?';
        cardHeader.style.fontSize = '100%';
        cardHeader.style.borderBottom = 'none';

        // Append card header to the discard dialog
        discardDialog.appendChild(cardHeader);

        // Create text for the dialog box
        var dialogText = document.createElement('p');
        dialogText.textContent = "If you leave, your edits won't be saved.";
        dialogText.classList.add('mt-0', 'mb-2');
        dialogText.style.display = 'inline'; // Set display to inline
        dialogText.style.fontSize = '70%';
        dialogText.style.textAlign = 'center';
        dialogText.classList.add('text-muted');
        // Append text to the discard dialog
        discardDialog.appendChild(dialogText);

        // Create discard link
        var discardLink = document.createElement('a');
        discardLink.textContent = 'Discard';
        discardDialog.style.textAlign = 'center';
        discardLink.style.textDecoration = 'none';
        discardLink.style.fontSize = '80%';
        discardLink.href = '#';
        discardLink.classList.add('text-danger', 'py-0', 'font-weight-bold');
        discardLink.addEventListener('click', discardPost);

        // Create cancel link
        var cancelLink = document.createElement('a');
        cancelLink.textContent = 'Cancel';
        cancelLink.style.textDecoration = 'none';
        cancelLink.style.fontSize = '80%';
        cancelLink.href = '#';
        cancelLink.classList.add('text-muted', 'py-0');
        cancelLink.addEventListener('click', hideDiscardPostCard);
        var hr = document.createElement('hr');
        hr.classList.add('m-1', 'mt-1', 'mb-1');
        // Append horizontal rule to the discard dialog
        discardDialog.appendChild(hr);

        // Append links to the discard dialog
        discardDialog.appendChild(discardLink);
        // Create a horizontal rule with danger red text
        var hr = document.createElement('hr');
        hr.classList.add('m-1', 'mt-1', 'mb-1');
        // Append horizontal rule to the discard dialog
        discardDialog.appendChild(hr);
        discardDialog.appendChild(cancelLink);

        // Insert discard dialog before the card body
        var card = document.querySelector('.card');
        card.appendChild(discardDialog); // Append to the existing dialog box
    }

    // Function to hide the discard post dialog box
    function hideDiscardPostCard() {
        var discardDialog = document.querySelector('.discard-dialog');
        discardDialog.remove();
    }

    // Function to discard the post (dummy function for demonstration)
    function discardPost() {
        // You can implement post discard logic here
        var discardDialog = document.querySelector('.container');
        discardDialog.remove();
    }
 // Function to expand the dialog box
 function expandDialog() {
    var imgContainer = document.querySelector('.upload-image-class');
    if (imgContainer) {
        console.log('Image container found:', imgContainer);
        imgContainer.style.width = '50%'; // Set width to 50% to occupy half of the row
        imgContainer.style.float = 'left'; // Float the image container to the left

        // Set the image container's height to match the card body's height
        var cardBodyHeight = document.querySelector('.card-body').offsetHeight;
        imgContainer.style.height = cardBodyHeight + 'px'; 

        // Create a container for profile picture and profile name
        var profileContainer = document.createElement('div');
        profileContainer.classList.add('d-flex', 'align-items-center', 'mb-2'); // Add flexbox and margin-bottom classes

        // Create profile picture
        var profilePicture = document.createElement('img');
        profilePicture.src = '../assets/createPost/filter/Aden.jpg'; // Set the source of the profile picture
        profilePicture.alt = 'Profile Picture'; // Set alt text for accessibility
        profilePicture.classList.add('profile-picture', 'rounded-circle', 'pr-1'); // Add a class if needed and Bootstrap margin class
        profilePicture.style.maxWidth = '15%';
        profilePicture.style.maxHeight = '15%';

        // Create profile name
        var profileName = document.createElement('div');
        profileName.textContent = 'John Doe'; // Set the profile name
        profileName.classList.add('profile-name', 'text-sm', 'text-truncate', 'd-inline'); // Add classes for smaller text size and single line

        // Append profile picture and profile name to the profile container
        profileContainer.appendChild(profilePicture);
        profileContainer.appendChild(profileName);

        // Create text input field
        var textField = document.createElement('textarea');
        textField.setAttribute('placeholder', 'Write a caption...');
        textField.setAttribute('rows', '4'); // Set the number of rows
        textField.classList.add('form-control', 'border-0','p-0'); // Add Bootstrap classes for styling
        textField.style.fontSize = '0.8rem';
        textField.style.borderBottom = '1px solid #ccc'; // Add bottom border
        textField.style.borderRadius = '0'; // Remove border radius
        textField.style.boxShadow = 'none'; // Remove box shadow
        textField.style.resize = 'auto'; // Disable textarea resizing



        var charCounter = document.createElement('span');
        charCounter.textContent = '0/2200'; // Initialize character count
        charCounter.classList.add('text-muted', 'text-sm', 'text-end'); // Add class for styling
        
        // Add CSS styles
        charCounter.style.fontSize = '0.8rem'; // Set the font size to make it smaller
        charCounter.style.float = 'right'; // Align the text to the right
        
        // Create an image element for the SVG
        var smileSVG = document.createElement('img');
        smileSVG.setAttribute('src', 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width= "12" viewBox="0 0 512 512"><path fill="%23b5b5b5" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>');
        smileSVG.style.float = 'left'; // Align the text to the right
        smileSVG.style.paddingTop = '0.5rem';
        

        // Function to update character count
        textField.addEventListener('input', function() {
            var count = this.value.length;
            charCounter.textContent = count + '/2200';
        });

        
        // Create a container for text field and character counter
        var inputContainer = document.createElement('div');
        inputContainer.classList.add('mb-2'); // Add margin-bottom class
        inputContainer.appendChild(textField);
        inputContainer.appendChild(charCounter);
        inputContainer.appendChild(smileSVG);

        // Create a container for profile and text input
        var contentContainer = document.createElement('div');
        contentContainer.classList.add('col-md-6', 'd-flex', 'flex-column', 'pt-2'); // Add Bootstrap column class and flexbox classes
        contentContainer.appendChild(profileContainer);
        contentContainer.appendChild(inputContainer);

        // Insert the content container after the image container
        imgContainer.parentNode.insertBefore(contentContainer, imgContainer.nextSibling);

        // Hide the upload-prompt container
        document.getElementById('upload-prompt').style.display = 'none';

        // Adjust card height to fit the image
        var cardHeight = document.querySelector('.card').offsetHeight;
        imgContainer.style.height = cardHeight + 'px'; // Set height of imgContainer to match card height
    } else {
        console.error('Image container not found');
    }

    var container = document.querySelector('.card');
    container.style.transition = 'width 2.5s ease-in, left 1.5s ease-in, right 2.5s ease-in'; // Add transition effect
    container.offsetHeight; // This line is added to force a reflow, triggering the transition
    container.style.width = '120%'; // Expand to full width
    container.style.left = '-10%'; // Move to the left edge
    container.style.right = '0'; // Move to the right edge
    container.style.marginLeft = 'auto'; // Reset left margin
    container.style.marginRight = 'auto'; // Reset right margin

    // Hide the icons
    var iconsToHide = document.querySelectorAll('.position-absolute');
    iconsToHide.forEach(function(icon) {
        icon.style.display = 'none';
    });
}
});