import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { ListaCursosService } from './lista-cursos.service';

describe('ListaCursosService', () => {
  let service: ListaCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
    });
    service = TestBed.inject(ListaCursosService);
  });

  beforeAll(function () {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Tests. By: María
   */
  describe('Casos lista cursos', () => {
    //---------------------------------------------------------------------------------
    //---------------------------- Lista cursos correcta ------------------------------
    //---------------------------------------------------------------------------------
    it('Lista cursos correcta', (done: DoneFn) => {
      //Act
      var user = {
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDMyZDllMDkwYmMzNWRiZjVjNDJkNDU0ZjEwNWU2ZjZkYmQxYTBkNjA1NTNjN2YxMGQyZmNkMTBmYzFiNGI0ZmE4OTIxYTAwMmRiNThiYzUiLCJpYXQiOiIxNjE1MzQ4ODk5LjMyNzc1NyIsIm5iZiI6IjE2MTUzNDg4OTkuMzI3NzYzIiwiZXhwIjoiMTY0Njg4NDg5OS4zMjA2NTciLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gRTZdjC5Y7ipsvOcac-miwFNcp3qnfh369HqsTvC-EymXOk2-aMGMK1ka5thHJjyJevKPwi43RLlUCvKFPG2-y6w_i5Kia4XjKpnhFczuL4CCnUN1HF4EobfpKiT51kG_h1c4O2GcwEnGaobBbyWzdBySXEmVeqK2Rjkxlamlz5ZiDSKL-VpJI3PqMZeSfkm8GibuItWFGEEGqO4S0eMWGI1oSGFArnLBTEYrTgmftgB_4a0HVZ7iKHbvqgq3OUxBJctO1ddkkt5JNQVLCMCun9-0zmWmjDcLRhG3OKRDfGGyJqaRCaAAD-hmb4aDiOEVe_FUBXb1JZirfD_uYkeu0c5uPVph2DcUk1vAUkLeJ-_4722dqvhV2bgIlu3uTVueJv91hK46ZgoXuK9hB706bIZf11s8L20vue6Sa8rrVE2ZfyeUmdOHmZJCdU5tIzPFoLSnRRiAjrk8-NH2VWo1iJ4J_mwNBmDqKg7YRWLnaF-4XxXkWSGzbqhiutvrR-l8yG_Tej7dwOpbCZt3xMCcLOfSuoml6i4m4xfcEJ4ske1YEl9y2olv-aXdG8nrUNixhAhEtzTaQAPwv8sBiyPIR-b2qSVFBUSdQzWE_s5uojqgbIBR6B_d-wRyJLxHtxkRfik3YXBcyKD4scvkDRvUsGMS9kTV0YsCT0CqjXJShg"
      }
      sessionStorage.setItem("apiPassport", JSON.stringify(user));

      service.getCursos().subscribe(
        (response: any) => {
          // Ass
          // Comprobamos código devuelto
          expect(response['code']).toBe(200);

          // Comprobamos que obtenemos 24 cursos
          expect(response['message'].length).toBe(24);

          // Comprobamos que el primer curso es 2AAFD
          expect(response['message'][0]['id']).toBe(1);
          expect(response['message'][0]['cicloFormativo']).toBe('2º de CFGS (Animación de Actividades Físicas y Deportivas)');
          expect(response['message'][0]['cicloFormativoA']).toBe('2AAFD');

          // Comprobamos que el último curso es E-LeASIR
          expect(response['message'][23]['id']).toBe(24);
          expect(response['message'][23]['cicloFormativo']).toBe('CFGS (Mod. E-Learning) (LOE) - Administración de Sistemas Informáticos de Red');
          expect(response['message'][23]['cicloFormativoA']).toBe('E-LeASIR');

          // Indicamos que la función asíncrona ha terminado
          done();
        },
        (error: any) => {
          console.log(error);
          console.log(error['error']);

          // Indicamos que la función asíncrona ha terminado
          done();
        }
      );
    });

  });

});
