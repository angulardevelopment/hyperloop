import { NgModule, Component, HostListener } from '@angular/core';
import { Routes, RouterModule, Router, PreloadAllModules } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HttmapComponent } from './httmap/httmap.component';
import { ApplicationStateService } from './application-state.service';
const routes: Routes = [
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    },
    {
        path: 'search', component: SearchComponent,

    },
    {
        path: 'httmap',
        component: HttmapComponent,
    }

];

const mobile_routes: Routes = [
  
    {path: '', component: HttmapComponent,pathMatch: 'full'},
  
    {path: '**', redirectTo: ''}
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules ,useHash:true })],
    exports: [RouterModule]
})


export class AppRoutingModule {
    public constructor(private router: Router,
        private applicationStateService: ApplicationStateService) {
    
        if (applicationStateService.getIsMobileResolution()) {
          router.resetConfig(mobile_routes);
        }
      }

 }

 