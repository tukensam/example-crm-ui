import { HttpHeaders } from "@angular/common/http";

export const API_ADDRESS = "http://localhost:5189/api";
export const OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };