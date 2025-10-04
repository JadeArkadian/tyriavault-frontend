import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameaccountComponent } from './pages/gameaccount/gameaccount.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { TradingpostComponent } from './pages/tradingpost/tradingpost.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'TyriaVault - Home' },
    { path: 'account', component: GameaccountComponent, title: 'TyriaVault - Account' },
    { path: 'characters', component: CharactersComponent, title: 'TyriaVault - Characters' },
    { path: 'tradingpost', component: TradingpostComponent, title: 'TyriaVault - Trading Post' },
    { path: 'analytics', component: AnalyticsComponent, title: 'TyriaVault - Analytics' },
    { path: '**', redirectTo: '' },
];