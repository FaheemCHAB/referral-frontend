import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstagramVideosService {

  constructor(private http: HttpClient) {}
  
  getVideos(): Observable<Video[]> {
    // Load from your JSON file
    return this.http.get<Video[]>('assets/data/video.json');
  }
}
