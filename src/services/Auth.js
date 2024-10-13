import React, { useEffect, useState } from 'react';
import ApiService from './ApiService';

export class Auth {


    _ApiService = new ApiService();



    async login(email, password) {

        try {
            const user = await this._ApiService.post("/login", {
                email: email,
                password: password
            });
            console.log("Datos de usuario", user);
            if (user && user.token) {
                localStorage.setItem('authToken', user.token); // Almacena el token en localStorage
            };
            return user
        } catch (error) {
            console.error('Ha ocurrido un error en el login de usuario: ', error);
            throw error;
        }
    }

    getToken() {
        return localStorage.getItem('authToken');
    }


    async logout() {
        localStorage.removeItem('authToken');
        try {
            return await this._ApiService.get("/logout");

        } catch (error) {
            console.error('Ha ocurrido un error en el cierre de sesión: ', error);
            throw error;
        }
    }

    async register(name, email, password) {

        try {
            const newUser = await this._ApiService.post("/register", {
                name: name,
                email: email,
                password: password
            })
            console.log(newUser);
            return newUser;

        } catch (error) {
            console.error('Ha ocurrido un error en el registro de usuario: ', error);
            throw error;
        }
    }


    verifyEmail(email){

        let status = false;
        let errs = [];

        const emailFormatError = this.emailFormat(email);
        if (emailFormatError) {
            errs.push(emailFormatError);
        }   
        status = errs.length > 0;
        return {
            errs: errs,
            status: status
        }
    }

    emailFormat(email) { 
        // Expresión regular para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Verifica si el email cumple con el formato
        if (!emailRegex.test(email)) {
            return "El email no cumple con el formato"; 
        }
    
        return null; // Si cumple con el formato
    }


    verifyPassword(password) {
        let status = false;
        let errs = [];
        
        const passwordErrorLength = this.passwordLength(password);
        if (passwordErrorLength) {
            errs.push(passwordErrorLength); // Añadir solo si hay un error
        }

        const passwordFormatMayusError = this.passwordFormatMayus(password);
        if (passwordFormatMayusError) {
            errs.push(passwordFormatMayusError);
        }


        const passwordFormatNumberError = this.passwordFormatNumber(password);
        if (passwordFormatNumberError) {
            errs.push(passwordFormatNumberError);
        }
        
        
        status = errs.length > 0;
        return {
            errs: errs,
            status: status
        }
    }

    //Verificar contraseña:

    passwordLength(pass) {
        if (pass.length < 8) {
            return "La contraseña es demasiado corta.";
        }
        return null;
    }

    passwordFormatMayus(pass) {
        const hasUpperCase = /[A-Z]/.test(pass); // Al menos una mayúscula
            
        if (!hasUpperCase) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }
    
        return null; // Si cumple con los requisitos
    }

    passwordFormatNumber(pass) {
        const hasNumber = /[0-9]/.test(pass); // Al menos un número
        if (!hasNumber) {
            return "La contraseña debe contener al menos un número.";
        }
        
        
    
        return null; // Si cumple con los requisitos
    }
}


