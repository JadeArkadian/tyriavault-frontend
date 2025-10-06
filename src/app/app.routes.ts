import { Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { GameaccountComponent } from './pages/gameaccount/gameaccount.component';
import { HomeComponent } from './pages/home/home.component';
import { TradingpostComponent } from './pages/tradingpost/tradingpost.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { titleKey: 'titles.home' } },
    { path: 'account', component: GameaccountComponent, data: { titleKey: 'titles.account' } } ,
    { path: 'characters', component: CharactersComponent, data: { titleKey: 'titles.characters' } },
    { path: 'tradingpost', component: TradingpostComponent, data: { titleKey: 'titles.tradingpost' } },
    { path: 'analytics', component: AnalyticsComponent, data: { titleKey: 'titles.analytics' } },
    { path: '**', redirectTo: '' },
];