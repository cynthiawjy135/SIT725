const cardList = [
    {
        title: "Penguin 2",
        image: "images/penguin.png",
        link: "About Penguin 2",
        desciption: "Hello, I am a penguin and I love swimming."
    },
    {
        title: "Penguin 3",
        image: "images/penguin.png",
        link: "About Penguin 3",
        desciption: "Hello, I am a penguin and I love swimming."
    }
    ]
    const clickMe = () => {
        alert("Thanks for clicking me. Hope you have a nice day!")
    }
    const addCards = (items) => {
        items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
        '</div><div class="card-content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
        '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.desciption+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend)
        });
    }

    const submitForm = () => {
        let formData = {};
        formData.first_name = $('#first_name').val();
        formData.last_name = $('#last_name').val();
        formData.password = $('#password').val();
        formData.email = $('#email').val();
        console.log("Form Data Submitted: ", formData);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.tabs');
        var instances = M.Tabs.init(elems, { swipeable: true });
    });

    $(document).ready(function(){
        $('.materialboxed').materialbox();
        $('#clickMeButton').click(()=>{
            //clickMe();
            $('#modal1').modal();
        });

        $('#formSubmit').click(()=>{
            submitForm();
        });
    
        addCards(cardList);
        
    });