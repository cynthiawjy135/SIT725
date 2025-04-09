    const addCards = (items) => {
        items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
        '</div><div class="card-content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
        '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.description+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend)
        });
    }

    const getProjects = () => {
        $.get('/projects',(response) => {
            addCards(response.data);
        })
    }

    const submitForm = async () => {
        let formData = {};
        formData.first_name = $('#first_name').val();
        formData.last_name = $('#last_name').val();
        formData.password = $('#password').val();
        formData.email = $('#email').val();
        console.log("Form Data Submitted: ", formData);

        // Sending data via fetch API
        try {
            const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Content type should be JSON
            },
            body: JSON.stringify(formData), // Converting data to JSON format
            });

            // Handle the server's response
            const result = await response.json();
            if (result.status == 200) {
                alert('Message submitted successfully!');
                console.log("POST Res: " + result);
                // Optionally, reset the form and close the modal if successful
                $('#modal1').modal('close');
            } else {
                alert('Error submitting message.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred while submitting the message.');
        }
    }
    

    $(document).ready(function(){
        $('.materialboxed').materialbox();
        $('#clickMeButton').click(()=>{
            $('#modal1').modal();
        });
        $('#formSubmit').click(()=>{
            submitForm();
        });
        getProjects();
    });