'use strict'

// ROOT. REMEMBER TO CHANGE WHEN DEPLOYING 
export const ROOT_URL = ""; // heroku
// export const ROOT_URL = "http://localhost/exam"; // local

// HOME, SEARCH
export const HOME_ENDPOINT = ROOT_URL + '/home';
export const TRACK_ENDPOINT = ROOT_URL + '/api/tracks';
export const ALBUM_ENDPOINT = ROOT_URL + '/api/albums';
export const ARTIST_ENDPOINT = ROOT_URL + '/api/artists';
export const SEARCH_ENDPOINT = ROOT_URL + '/api/searches';

// CART, INVOICE
export const CART_ENDPOINT = ROOT_URL + '/api/cart';
export const CHECKOUT_ENDPOINT = ROOT_URL + '/checkout';
export const INVOICE_ENDPOINT = ROOT_URL + '/api/invoices';

// LOGIN, SIGN-UP, LOGOUT
export const LOGOUT_ENDPOINT = ROOT_URL + '/api/logout';
export const SIGNUP_ENDPOINT = ROOT_URL + '/api/customers';
export const LOGIN_ADMIN_ENDPOINT = ROOT_URL + '/api/login/admin';
export const LOGIN_ENDPOINT = ROOT_URL + '/login/user';
export const LOGIN_USER_ENDPOINT = ROOT_URL + '/api/login/customers';

// USER
export const GET_USER_INFO_ENDPOINT = ROOT_URL + '/api/customers/?id=current';
export const UPDATE_USER_INFO_ENDPOINT = ROOT_URL + '/api/customers';

// ADMIN
export const MUSIC_ADMIN = ROOT_URL + '/admin-music';
