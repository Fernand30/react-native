const server_url = 'https://catlabs.livecities.org';

const NormalApi = function (url, data) {
    return fetch(url, {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            } 
        }
    ).then( resp => resp.json() );
}

const LoginApi = function (email, password) {
    const loginUrl = server_url + '/v0/login';
    var data = {
        email : email,
        password : password
    };

    return fetch(loginUrl, {
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );

}

const RegisterApi = function (email, password, firstName, lastName) {
    const registerUrl = server_url + '/v0/users';
    var data = {
        email : email,
        password : password,
        first_name : firstName,
        last_name : lastName,
    };

    return fetch(registerUrl, {
        method : 'PUT',
        body : JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const UploadAvatar = function(token, avatarURI){
    const avatarUrl = server_url + '/v0/me/image';

    var formData  = new FormData();
    
    formData.append('image', {
        uri: avatarURI,
        type: 'image/jpeg',  // <-  Did you miss that one?
        name: 'avatar',
    });
    
    return fetch(avatarUrl, {
        method : 'PUT',
        body : formData,
        headers : {
            'authorization' : token,
            'Content-Type' : 'multipart/form-data'
        }
    }).then( resp => resp.json() );
}

const CreateResourceApi = function (token, name, description, isa, team, latitud, longitude) {
    const resourceUrl = server_url + '/v0/resources';
    var data = {
        name : name,
        description : description,
        isa : isa,
        team : team,
        latitud : latitud,
        longitude : longitude
    };

    return fetch(resourceUrl, {
        method : 'PUT',
        headers: {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then( resp => resp.json() );
}

const UpdateResourceApi = function (token, name, description, isa, team, latitud, longitud) {
    const resourceUrl = server_url + '/v0/resources/<pk>';
    var data = {
        name : name,
        description : description,
        isa : isa,
        team : team,
        latitud : latitud,
        longitude : longitude
    };

    return fetch(resourceUrl, {
        method : 'POST',
        headers: {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    }).then( resp => resp.json() );
}

const GetResourceApi = function ( token ) {
    const resourceUrl = server_url + '/v0/resources';

    return fetch(resourceUrl, {
        method : 'GET',
        headers: {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
    }).then( resp => resp.json() );
}

const DeleteResourceApi = function( token ) {
    const resourceUrl = server_url + '/v0/resources/<pk>';
    
    return fetch(resourceUrl, {
        method : 'DELETE',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
    }).then(resp => resp.json());
}

const CreateTaskApi = function( token , name , description, team, latitud, longitude, start_date, end_date, project){
    const taskUrl = server_url + '/v0/tasks';
    var data = {
        name : name,
        description : description,
        team : team,
        latitud : latitud,
        longitude : longitude,
        start_date : start_date,
        end_date : end_date,
        project : project
    };

    return fetch(taskUrl, {
        method : 'PUT',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then(resp => resp.json());
}

const RetriveTaskApi = function ( token ){
    const retriveUrl = server_url + '/v0/search?class=task';

    return fetch(retriveUrl, {
        method : 'GET',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
    }).then(resp => resp.json());
}

const UpdateTaskApi = function (token ,name , description, team, latitud, longitude,  start_date, end_date, project) {
    const taskUrl = server_url + '/v0/tasks/<PK>';
    var data = {
        name : name,
        description : description,
        team : team,
        latitud : latitud,
        longitude : longitude,
        start_date : start_date,
        end_date : end_date,
        project: project
    };

    return fetch(taskUrl, {
        method : 'POST',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then(resp => resp.json());
}

const AddTaskRequirementApi = function( token , isa){
    const taskUrl = server_url + '/v0/tasks/PK/resource';
    var data = {
        isa : isa
    };

    return fetch(taskUrl, {
        method : 'POST',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then(resp => resp.json());
}

const AddTaskTag = function( token, tag ) {
    const tagUrl = server_url + '/v0/me/tags';
    var data = {
        tag : tag
    };

    return fetch(tagUrl , {
        method : 'PUT',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then(resp => resp.json());
}

const DeleteTaskTag = function( token, tag ) {
    const tagUrl = server_url + '/v0/tasks/PK/tags';
    var data = {
        tag : tag
    };

    return fetch(tagUrl, {
        method : 'DELETE',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    }).then(resp => resp.json());
}


const getSixSkillApi = function( token ){
    const SkillUrl = 'https://catlabs.livecities.org/v0/search?class=resourceclass&size=6';

    return fetch(SkillUrl, {
        method : 'GET',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
    }).then(resp => resp.json() );
}

const getSkillListWidthStrApi = function( token, str ){
    const getUrl = server_url + '/v0/resources/a/' + str + '?isa=knowledge&size=6';
    
    console.log(getUrl);

    return fetch(getUrl, {
        method : 'GET',
        headers : {
            'authorization' : token,
            'Content-Type': 'application/json',
        },
    }).then(resp => resp.json() );
}

export { NormalApi, LoginApi, RegisterApi, UploadAvatar, CreateResourceApi, UpdateResourceApi, getSixSkillApi,getSkillListWidthStrApi,
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag};