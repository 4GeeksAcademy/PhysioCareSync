
const API_URL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			isAuthenticated: false,
			preferenceId: null,
			informationPatient: [],
			informationSpecialist: []

		},
		actions: {
			


			loginPatient: async (patient) => {
				try {
					const response = await fetch(API_URL + "/api/token_patient", {
						method: 'POST',
						body: JSON.stringify(patient),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (!response.ok) {
						throw new Error("An error occurred with the query")
					}
					const data = await response.json();
					console.log("Log In successful") 
					return data


				} catch (error) {
					console.error("There was an error with the login action", error)
				}
			},

			accessConfirmationPatient: async () => {
				const store = getStore()
				try {
					const token = sessionStorage.getItem('tokenPatient')
					const response = await fetch(API_URL + "/api/private_patient", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					})

					if (!response.ok) {
						getActions().deleteTokenPatient();
						const emptyInformation = {}
						setStore({ ...store, informationPatient: emptyInformation })
						throw new Error("There was an error with the token confirmation in flux")
					}

					const data = await response.json();
					console.log("Still have access this is the information you need from back end")
					setStore({ ...store, informationPatient: data.patient })

				} catch (error) {
					console.log("Authentication issue you do not have access", error)
				}
			},

			accessConfirmationSpecialist: async () => {
				const store = getStore()
				try {
					const token = sessionStorage.getItem('tokenSpecialist')
					const response = await fetch(API_URL + "/api/private_specialist", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					})

					if (!response.ok) {
						getActions().deleteTokenSpecialist();
						const emptyInformation = {}
						setStore({ ...store, informationSpecialist: emptyInformation })
						throw new Error("There was an error with the token confirmation in flux")
					}

					const data = await response.json();
					console.log("Still have access this is the information you need from back end", data)
					setStore({ ...store, informationSpecialist: data.specialist })

				} catch (error) {
					console.log("Authentication issue you do not have access", error)

				}

			},

			deleteTokenPatient: async () => {
				sessionStorage.removeItem('tokenPatient')
			},

			deleteTokenSpecialist: async () => {
				sessionStorage.removeItem('tokenSpecialist')
			},

			loginSpecialist: async (specialist) => {
				try {
					const response = await fetch(API_URL + "/api/token_specialist", {
						method: 'POST',
						body: JSON.stringify(specialist),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (!response.ok) {
						throw new Error("An error occurred with the query")
					}
					const data = await response.json();
					console.log("Log In successful")
					return data

				} catch (error) {
					console.error("There was an error with the login action", error)
				}
			},

			createNewPatient: async (newPatient) => {
				try {
					const response = await fetch(API_URL + "/api/signup_patient", {
						method: "POST",
						body: JSON.stringify(newPatient),
						headers: {
							"Content-Type": "application/json"
						}

					});
					if (!response.ok) {
						throw new Error("There was a problem with the funtion in flux")
					}
					const data = await response.json();
					console.log("User created successfully", data)


				} catch (error) {
					console.error("There was an error tryinig to create the Patient", error)
				}
			},

			createNewSpecialist: async (newSpecialist) => {
				try {
					const response = await fetch(API_URL + "/api/signup_specialist", {
						method: "POST",
						body: JSON.stringify(newSpecialist),
						headers: {
							"Content-Type": "application/json"
						}

					});
					if (!response.ok) {
						throw new Error("There was a problem with the funtion in flux")
					}
					const data = await response.json();
					console.log("User created successfully", data)


				} catch (error) {
					console.error("There was an error tryinig to create the Specialist", error)

				}
			},


			createPreference: async () => {
				try {
					const response = await fetch(API_URL + "/api/create_preference", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						description: "Bananita contenta",
						price: 100,
						quantity: 1,
					}),
					});

					if (response.ok) {
					console.log("El response vino ok del back end y tiene esta info: ", response)
					const data = await response.json();
					const { id } = data;
					console.log("ESTE ES EL FAMOSO ID: ", id)
					let store = getStore()
					setStore({...store , preferenceId: id})
					let store2 = getStore()
					console.log("Este es el contenido de id en el store: ",store2.preferenceId)
					return id;
					} else {
					console.error("Error creating preference, o sea response.ok dio false en flux.js");
					}
				} catch (error) {
					console.error(error);
				}

			  },
			

			editPatient: async (newInformationForm, patientId) => {
				console.log(newInformationForm)
				const nameRoute = "/api/update_information_patient/"
				const stringPatientId = String(patientId)
				console.log(API_URL + nameRoute + stringPatientId)
				const store = getStore()
				try {
					const response = await fetch(API_URL + nameRoute + stringPatientId, {
						method: "PUT",
						body: JSON.stringify(newInformationForm),
						headers: {

							'Content-Type': 'application/json',
						}
					})

					if (response.ok) {
						const data = await response.json()
						console.log("Changes of user upload succesfully")
						setStore({ ...store, informationPatient: data.patient })
					}

					else {
						throw new Error("The request was failed! check it out!")
					}

				}
				catch (error) {
					console.log("There was an error, check it out!", error)
				}
			},

			editImagePatient: async (image, patientId) => {
				console.log(image)
				const nameRoute = "/api/update_img_patient/"
				const stringPatientId = String(patientId)
				console.log(API_URL + nameRoute + stringPatientId)
				const store = getStore()
				try {

					const response = await fetch(API_URL + nameRoute + stringPatientId, {

						method: "PUT",
						body: image,
						headers: {
							'Accept': 'application/json',
						}
					})

					if (response.ok) {
						const data = await response.json()
						console.log("image upload succesfully")
						setStore({ ...store, informationPatient: data.patient })
					}

					else {
						throw new Error("The request was failed! check it out!")
					}

				}
				catch (error) {
					console.log("There was an error", error)
				}
			},

			editSpecialistInformation: async (specialist_id, formInformation) => {
				const store = getStore()
				const nameRoute = "/api/update_information_specialist/"
				const stringSpecialistId = String(specialist_id)

				console.log(stringSpecialistId)
				console.log(formInformation)

				try {

					const response = await fetch(API_URL + nameRoute + stringSpecialistId, {
						method: "PUT",
						body: JSON.stringify(formInformation),
						headers: {
							"Content-Type": "application/json"
						}
					})

					if (response.ok) {
						const jsonResponse = await response.json()
						console.log("Changes upload succesfully")
						setStore({ ...store, informationSpecialist: jsonResponse.specialist })
					}

					else {
						throw new Error("The request was failed! check it out!")
					}

				}
				catch (error) {
					console.log("There was an error, check it out", error)
				}
			},

			editImagesSpecialist: async (formImage, specialistId) => {
				const store = getStore()
				const nameRoute = "/api/update_img_specialist/"
				const stringSpecialistId = String(specialistId)
				try {

					const response = await fetch(API_URL + nameRoute + stringSpecialistId, {
						method: "PUT",
						body: formImage,
						headers: {
							'Accept': 'application/json',
						}
					})

					if (response.ok) {
						const jsonResponse = await response.json()
						console.log("images upload succesfully")
						setStore({ ...store, informationSpecialist: jsonResponse.specialist })
					}

					else {
						throw new Error("The request was failed! check it out!")
					}

				}
				catch (error) {
					console.log("There was an error, check it out", error)
				}
			},

			getSpecialistInfo: async (id_specilist) => {
				try{
					const response = await fetch(API_URL + `get_information_specialist/${id_specilist}`)
					if(!response.ok){
						throw new Error("Function can't get the information")
					}
					const data = await response.json()
					const store = getStore();
					setStore({...store, viewSpecialist:data})
					console.log("This is the specialist information", data)

				}catch(error){
					console.error("There is an error getting the specialist info:", error)
				}


			},


			login: () => {
				setStore({ isAuthenticated: true });
			},

			logout: () => {

				const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?');


				if (confirm) {

					sessionStorage.removeItem('token');


					setStore({ isAuthenticated: false });


					const history = useHistory();
					history.push('/');
				}
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			}
		}
	}
}



export default getState;

