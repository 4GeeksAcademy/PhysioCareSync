import { useNavigate } from "react-router-dom";

const API_URL = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			// ... otros estados
			specialistsList: [],
			informationSpecialist: null, // Agrega esta línea si no está ya definida
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
			informationSpecialist: [],
			isTokenAuthentication: false,
			specialistsList: [],
			informationSpecialistSetCertificates: [],
			messageUploadCertificates: null,
			informationAdministration: [],
		},
		actions: {
			getSpecialistInformation: () => {
				const store = getStore();
				return store.informationSpecialist;
			},
			// Agrega estas funciones si no están ya definidas
			addSpecialist: (specialist) => {
				const store = getStore();
				setStore({ ...store, specialistsList: [...store.specialistsList, specialist] });
			},
			setSpecialistInformation: (information) => {
				const store = getStore();
				// Store specialist information in localStorage
				localStorage.setItem('informationSpecialist', JSON.stringify(information));
				setStore({ ...store, informationSpecialist: information });
			},
			accessConfirmationSpecialist: async () => {
				const store = getStore();

				try {
					const token = sessionStorage.getItem('tokenSpecialist');
					const response = await fetch(API_URL + "/api/private_specialist", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});

					if (!response.ok) {
						getActions().deleteTokenSpecialist();
						store.isTokenAuthentication = true;
						const emptyInformation = {};
						localStorage.removeItem('informationSpecialist'); // Remove from localStorage
						setStore({ ...store, informationSpecialist: emptyInformation });
						throw new Error("There was an error with the token confirmation in flux");
					}

					store.isTokenAuthentication = false;

					const data = await response.json();

					// Store specialist information in localStorage
					localStorage.setItem('informationSpecialist', JSON.stringify(data.specialist));

					console.log("Still have access; this is the information you need from the back end", data);
					setStore({ ...store, informationSpecialist: data.specialist });

				} catch (error) {
					console.log("Authentication issue; you do not have access", error);
				}
			},




			loadAllSpecialists: async (page, limit) => {
				const store = getStore();
				if (store.loadingAllSpecialists) {
					return;
				}

				const urlSpecialistPage = `/api/specialist?page=${page}&limit=${limit}`
				try {
					setStore({ ...store, loadingAllSpecialists: true });

					const response = await fetch(API_URL + urlSpecialistPage, {
						method: "GET",
						headers: {
							'Content-type': 'application/json',
						},


					});
					if (!response.ok) {
						throw new Error(`Error loading all specialists. Status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ ...store, specialistsList: data });
					store.loadingListSpecialist = true
				} catch (error) {
					console.error("Error loading all specialists:", error);


				} finally {
					setStore({ ...store, loadingAllSpecialists: false });
				}
			},

			loadSpecialistById: async (specialistId) => {
				try {
					const response = await fetch(API_URL + `/api/get_specialist_info/${encodeURIComponent(specialistId)}`);

					if (!response.ok) {
						const errorMessage = `Error loading specialist with ID ${specialistId}. Status: ${response.status}`;
						console.error(errorMessage);
						throw new Error(errorMessage);
					}

					const data = await response.json();

					if (!data || data.error) {
						const errorMessage = data ? `Error loading specialist with ID ${specialistId}: ${data.error}` : `Empty response for specialist with ID ${specialistId}`;
						console.error(errorMessage);
						throw new Error(errorMessage);
					}

					return data.specialist_info;
				} catch (error) {
					console.error(`Error loading specialist with ID ${specialistId}: ${error.message}`);
					throw new Error(`Error loading specialist with ID ${specialistId}: ${error.message}`);
				}
			},




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
						console.error("An error occurred with the query")
						return ({ error: "There was an error with the login action" })
						// throw new Error("An error occurred with the query")
					}
					const data = await response.json();
					console.log("Log In successful")
					return data


				} catch (error) {
					console.error("An error occurred with the query")
					return ({ error: "There was an error with the login action" })
				}
			},

			accessConfirmationPatient: async () => {
				const store = getStore();
				try {
					const token = sessionStorage.getItem('tokenPatient');
					const response = await fetch(API_URL + "/api/private_patient", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});

					if (!response.ok) {
						store.isTokenAuthentication = true;
						getActions().deleteTokenPatient();
						const emptyInformation = {};
						setStore({ ...store, informationPatient: emptyInformation });
						throw new Error("There was an error with the token confirmation in flux");
					}
					store.isTokenAuthentication = false;
					const data = await response.json();
					console.log("Still have access this is the information you need from back end");
					setStore({ ...store, informationPatient: data.patient });

				} catch (error) {
					console.log("Authentication issue you do not have access", error);
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
						store.isTokenAuthentication == true
						const emptyInformation = {}
						setStore({ ...store, informationSpecialist: emptyInformation })

						console.error("There was an error with the token confirmation in flux")

						return ({ error: "There was an error with the token confirmation in flux" })
					}


					store.isTokenAuthentication == false
					const data = await response.json();
					console.log("Still have access, this is the information you need from back end", data)
					setStore({ ...store, informationSpecialist: data.specialist })

				} catch (error) {
					console.error("Authentication issue you do not have access", error)
					return ({ error: "There was an error with the token confirmation in flux" })


				}

			},

			deleteTokenPatient: async () => {
				const store = getStore()
				sessionStorage.removeItem('tokenPatient')
				sessionStorage.removeItem("patientId")
				store.isTokenAuthentication == false
			},
			deleteTokenSpecialist: async () => {
				const store = getStore()
				sessionStorage.removeItem('tokenSpecialist')
				sessionStorage.removeItem("specialistId")
				store.isTokenAuthentication == false
				sessionStorage.removeItem("payStatus")

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
						console.error("An error occurred with the query")
						return ({ error: "There was an error with the login action" })
					}
					const data = await response.json();
					console.log("Log In successful")
					return data

				} catch (error) {
					console.error("Authentication issue you do not have access", error)
					return ({ error: "There was an error with the token confirmation in flux" })
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
					return data;

				} catch (error) {
					console.error("There was an error tryinig to create the Patient", error)
				}
			},

			// admmin
			createNewAdministrator: async (newAdmin) => {
				const store = getStore();
				try {
					const response = await fetch(API_URL + "/api/singup_admin", {
						method: "POST",
						body: JSON.stringify(newAdmin),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (!response.ok) {
						throw new Error("There was a problem with the function in flux");
					}

					const data = await response.json();
					const updatedInformationList = [...store.informationAdministration, data];
					setStore({ ...store, informationAdministration: updatedInformationList });
					return data;
				}
				catch (error) {
					console.error("There was an error trying to create the Specialist", error);
				}
			},

			loginAdmin: async (admin) => {
				try {
					const response = await fetch(API_URL + "/api/token_admin", {
						method: 'POST',
						body: JSON.stringify(admin),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (!response.ok) {
						console.error("An error occurred with the query")
						return ({ error: "There was an error with the login action" })
					}
					const data = await response.json();
					console.log("Log In successful")
					return data

				} catch (error) {
					console.error("Authentication issue you do not have access", error)
					return ({ error: "There was an error with the token confirmation in flux" })
				}

			},
			accessConfirmationAdmin: async () => {
				const store = getStore()
				try {
					const token = sessionStorage.getItem('tokenAdmin')
					const response = await fetch(API_URL + "/api/private_admin", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					})

					if (!response.ok) {
						getActions().deleteTokenSpecialist();
						store.isTokenAuthentication == true
						const emptyInformation = {}
						setStore({ ...store, informationAdministration: emptyInformation })
						console.error("There was an error with the token confirmation in flux")
						return ({ error: "There was an error with the token confirmation in flux" })
					}
					store.isTokenAuthentication == false
					const data = await response.json();
					console.log("Still have access, this is the information you need from back end", data)
					setStore({ ...store, informationAdministration: data })

				} catch (error) {
					console.error("Authentication issue you do not have access", error)
					return ({ error: "There was an error with the token confirmation in flux" })


				}

			},
			deleteTokenAdmin: async () => {
				const store = getStore()
				sessionStorage.removeItem('tokenAdmin')
				sessionStorage.removeItem("AdminId")
				store.isTokenAuthentication == false
			},

			// admin enf


			createNewSpecialist: async (newSpecialist) => {
				const store = getStore();
				try {
					const response = await fetch(API_URL + "/api/signup_specialist", {
						method: "POST",
						body: JSON.stringify(newSpecialist),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (!response.ok) {
						throw new Error("There was a problem with the function in flux");
					}
					const data = await response.json();
					const updatedSpecialistsList = [...store.specialistsList, data];
					setStore({ ...store, specialistsList: updatedSpecialistsList });
					return data;
				} catch (error) {
					console.error("There was an error trying to create the Specialist", error);
				}
			},



			setSpecialistInformation: (information) => {
				const store = getStore();
				setStore({ ...store, informationSpecialist: information });
			},

			getSpecialistInformation: () => {
				const store = getStore();
				return store.informationSpecialist;
			},


			createPreference: async (theid) => {
				try {
					console.log("Aquí está el id del actions", theid)
					const response = await fetch(API_URL + "/api/create_preference", {

						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							theid: theid,
							description: "Suscripción única",
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
						setStore({ ...store, preferenceId: id })
						let store2 = getStore()
						console.log("Este es el contenido de id en el store: ", store2.preferenceId)
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
						return data;
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
				try {
					const response = await fetch(API_URL + `/api/update_information_specialist/${specialist_id}`, {
						method: "PUT",
						body: JSON.stringify(formInformation),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (response.ok) {
						const jsonResponse = await response.json();
						console.log("Changes upload successfully");
						getActions().setSpecialistInformation(jsonResponse.specialist);
						return jsonResponse
					} else {
						throw new Error("The request was failed! Check it out!");
					}
				} catch (error) {
					console.log("There was an error, check it out", error);
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

			editCertificatesSpecialist: async (formCertificates, specialistId) => {
				const store = getStore()
				const stringSpecialistId = String(specialistId)
				const route = "/api/upload_certificates_specialist/"
				store.messageUploadCertificates = "Subiendo información..."

				// for (var pair of formCertificates.entries()) {
				// 	console.log(pair[0] + ' ' + pair[1])
				// }

				try {
					const response = await fetch(API_URL + route + stringSpecialistId, {
						method: "POST",
						body: formCertificates,
						headers: {
							"Accept": "application/json"
						}
					})

					if (response.ok) {
						const jsonResponse = await response.json()
						store.messageUploadCertificates = "Subida de información exitosa"
						setStore({ ...store, informationSpecialistSetCertificates: jsonResponse.specialist_information })
						console.log(jsonResponse.specialist_information)
					}

					else {
						throw new Error("The request was failed! check it out!")
					}

				}

				catch (error) {
					store.messageUploadCertificates = "Subida de información fallida"
					console.log("There was an error, check it out", error)
				}
			},

			getSpecialistInfo: async (id_specilist) => {
				try {
					const response = await fetch(API_URL + `get_information_specialist/${id_specilist}`)
					if (!response.ok) {
						throw new Error("Function can't get the information")
					}
					const data = await response.json()
					const store = getStore();
					setStore({ ...store, viewSpecialist: data })
					console.log("This is the specialist information", data)

				} catch (error) {
					console.error("There is an error getting the specialist info:", error)
				}


			},

			authorizeSpacialist: async (specialistId) => {
				try {
					const response = await fetch(API_URL + `/api/authorize_specialist/${specialistId}`, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ is_authorized: true })
					})
					if (!response.ok) {
						throw new Error("There was an error with the response from backend")
					}
					const data = await response.json()
					console.log("Authorizatiion success", data)

				} catch (error) {
					console.error("There was a problem with the request in flux", error)
				}

			},


			login: () => {
				setStore({ isAuthenticated: true });
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
