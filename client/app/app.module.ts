import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app.routing'
import { ElModule } from 'element-angular'
import { ExAppComponent } from './app.component'
// import { ExSharedModule } from './shared/module'

@NgModule({
  declarations: [
    ExAppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    ElModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: 'WindowLocation', useValue: location },
  ],
  bootstrap: [ExAppComponent],
})
export class AppModule {
}

