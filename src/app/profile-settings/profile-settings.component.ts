import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '../services/profile.service';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {
    
    user: IProfile = ({} as any) as IProfile;
    fetching: boolean = false;
    saving: boolean = false;
    error!: string

    constructor(private profile: ProfileService) {
    }
    async ngOnInit() {
        this.fetching = true;
        this.user = await this.getProfileUser();
        this.fetching = false;
    }

    async getProfileUser() {
        let user: IProfile = ({} as any) as IProfile;
        while (Object.keys(user).length == 0) {
            try {
                user = await this.profile.getProfileUser();
            } catch (error : any) {
                console.log(error.error)
            }
        }
        return user;
    }

    clearError(){
        this.error = "";
    }

    async saveProfile() { 
        this.saving = true;
        this.clearError();
        let user = Object.assign({},this.profile.user);
        try{
            this.user = await this.profile.setName(this.user.firstName,this.user.lastName) as IProfile;
            this.user = await this.profile.setUserEmail() as IProfile
        }
        catch(error : any){
            this.error = error.error;
            if(this.error == "Error on email generation"){
                this.user = user;
            }
        }
        this.saving = false;
    }
}