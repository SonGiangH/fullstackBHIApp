import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from '../home/home.component';
import { SurveyformComponent } from '../surveyform/surveyform.component';
import { SlidingformComponent } from '../slidingform/slidingform.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SurveyService } from './survey.service';
import { AppComponent } from '../app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditSurveyComponentComponent } from '../edit-survey-component/edit-survey-component.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SteermodeComponent } from '../steermode/steermode.component';
import { HoldmodeComponent } from '../holdmode/holdmode.component';
import { ToolformComponent } from '../toolform/toolform.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToolService } from './tool.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required for Angular Material
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TableCellComponent } from '../table-cell/table-cell.component';

@NgModule({
  declarations: [
    HomeComponent,
    SurveyformComponent,
    SlidingformComponent,
    EditSurveyComponentComponent,
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    SteermodeComponent,
    HoldmodeComponent,
    ToolformComponent,
    LoginComponent,
    RegisterComponent,
    TableCellComponent
  ],
  imports: [BrowserModule, 
            FormsModule, 
            HttpClientModule, 
            AppRoutingModule, 
            BrowserAnimationsModule, // required for Angular Material
            MatTabsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            ],

  providers: [SurveyService, 
              ToolService, 
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}