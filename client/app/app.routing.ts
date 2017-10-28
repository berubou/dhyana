import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const appRoutes: Routes = [
  // {
  //   path: 'basic',
  //   loadChildren: './basic/basic.module#BasicModule',
  // },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
