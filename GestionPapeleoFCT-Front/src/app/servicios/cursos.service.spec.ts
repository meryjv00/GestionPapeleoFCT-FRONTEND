import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { CursosService } from './cursos.service';

describe('CursosService', () => {
  let service: CursosService;

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
    service = TestBed.inject(CursosService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  /**
  * Tests. By: María
  */
  describe('Casos cursos', () => {
    //---------------------------------------------------------------------------------
    //---------------------------- Actualización cursos correcta ----------------------
    //---------------------------------------------------------------------------------
     it('Actualizar curso correcto', (done: DoneFn) => {
      // Arr (Curso)
      var user = {
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDMyZDllMDkwYmMzNWRiZjVjNDJkNDU0ZjEwNWU2ZjZkYmQxYTBkNjA1NTNjN2YxMGQyZmNkMTBmYzFiNGI0ZmE4OTIxYTAwMmRiNThiYzUiLCJpYXQiOiIxNjE1MzQ4ODk5LjMyNzc1NyIsIm5iZiI6IjE2MTUzNDg4OTkuMzI3NzYzIiwiZXhwIjoiMTY0Njg4NDg5OS4zMjA2NTciLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gRTZdjC5Y7ipsvOcac-miwFNcp3qnfh369HqsTvC-EymXOk2-aMGMK1ka5thHJjyJevKPwi43RLlUCvKFPG2-y6w_i5Kia4XjKpnhFczuL4CCnUN1HF4EobfpKiT51kG_h1c4O2GcwEnGaobBbyWzdBySXEmVeqK2Rjkxlamlz5ZiDSKL-VpJI3PqMZeSfkm8GibuItWFGEEGqO4S0eMWGI1oSGFArnLBTEYrTgmftgB_4a0HVZ7iKHbvqgq3OUxBJctO1ddkkt5JNQVLCMCun9-0zmWmjDcLRhG3OKRDfGGyJqaRCaAAD-hmb4aDiOEVe_FUBXb1JZirfD_uYkeu0c5uPVph2DcUk1vAUkLeJ-_4722dqvhV2bgIlu3uTVueJv91hK46ZgoXuK9hB706bIZf11s8L20vue6Sa8rrVE2ZfyeUmdOHmZJCdU5tIzPFoLSnRRiAjrk8-NH2VWo1iJ4J_mwNBmDqKg7YRWLnaF-4XxXkWSGzbqhiutvrR-l8yG_Tej7dwOpbCZt3xMCcLOfSuoml6i4m4xfcEJ4ske1YEl9y2olv-aXdG8nrUNixhAhEtzTaQAPwv8sBiyPIR-b2qSVFBUSdQzWE_s5uojqgbIBR6B_d-wRyJLxHtxkRfik3YXBcyKD4scvkDRvUsGMS9kTV0YsCT0CqjXJShg"
      }
      sessionStorage.setItem("apiPassport", JSON.stringify(user));

      const curso = {
        'id': 1,
        'tutor': "Ana Belén Santos Cabañas",
        'familiaProfesional': "CFGS   (Animación de Actividades Físicas y Deportivas)",
        'cicloFormativo': "2º de CFGS (Animación de Actividades Físicas y Deportivas)",
        'cicloFormativoA': "2AAFD",
        'cursoAcademico': "2020/2021",
        'nHoras': 600
      };

      //Act
      service.updateCurso(curso).subscribe(
        (response: any) => {
          //Ass
          // Comprobamos código devuelto
          expect(response['code']).toBe(200);

          // Comprobamos que ha actualizado el objeto
          expect(response['message']['familiaProfesional']).toBe(curso.familiaProfesional);
          expect(response['message']['cicloFormativo']).toBe(curso.cicloFormativo);
          expect(response['message']['cicloFormativoA']).toBe(curso.cicloFormativoA);
          expect(response['message']['cursoAcademico']).toBe(curso.cursoAcademico);
          expect(response['message']['nHoras']).toBe(curso.nHoras);

          // Indicamos que la función asíncrona ha terminado
          done();
        });
    }); 


    //---------------------------------------------------------------------------------
    //---------------------------- Eliminación cursos inexistentes --------------------
    //---------------------------------------------------------------------------------
    it('Eliminar curso inexistente', (done: DoneFn) => {
      // Arr
      var idCurso = 30;
      var user = {
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDMyZDllMDkwYmMzNWRiZjVjNDJkNDU0ZjEwNWU2ZjZkYmQxYTBkNjA1NTNjN2YxMGQyZmNkMTBmYzFiNGI0ZmE4OTIxYTAwMmRiNThiYzUiLCJpYXQiOiIxNjE1MzQ4ODk5LjMyNzc1NyIsIm5iZiI6IjE2MTUzNDg4OTkuMzI3NzYzIiwiZXhwIjoiMTY0Njg4NDg5OS4zMjA2NTciLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gRTZdjC5Y7ipsvOcac-miwFNcp3qnfh369HqsTvC-EymXOk2-aMGMK1ka5thHJjyJevKPwi43RLlUCvKFPG2-y6w_i5Kia4XjKpnhFczuL4CCnUN1HF4EobfpKiT51kG_h1c4O2GcwEnGaobBbyWzdBySXEmVeqK2Rjkxlamlz5ZiDSKL-VpJI3PqMZeSfkm8GibuItWFGEEGqO4S0eMWGI1oSGFArnLBTEYrTgmftgB_4a0HVZ7iKHbvqgq3OUxBJctO1ddkkt5JNQVLCMCun9-0zmWmjDcLRhG3OKRDfGGyJqaRCaAAD-hmb4aDiOEVe_FUBXb1JZirfD_uYkeu0c5uPVph2DcUk1vAUkLeJ-_4722dqvhV2bgIlu3uTVueJv91hK46ZgoXuK9hB706bIZf11s8L20vue6Sa8rrVE2ZfyeUmdOHmZJCdU5tIzPFoLSnRRiAjrk8-NH2VWo1iJ4J_mwNBmDqKg7YRWLnaF-4XxXkWSGzbqhiutvrR-l8yG_Tej7dwOpbCZt3xMCcLOfSuoml6i4m4xfcEJ4ske1YEl9y2olv-aXdG8nrUNixhAhEtzTaQAPwv8sBiyPIR-b2qSVFBUSdQzWE_s5uojqgbIBR6B_d-wRyJLxHtxkRfik3YXBcyKD4scvkDRvUsGMS9kTV0YsCT0CqjXJShg"
      }
      sessionStorage.setItem("apiPassport", JSON.stringify(user));

      //Act
      service.deleteCurso(idCurso).subscribe(
        (response: any) => {
          done();
        },
        (error: any) => {
          // Ass
          // Comprobamos código devuelto
          expect(error['error']['code']).toBe(400);

          // Comprobamos mensaje devuelto
          expect(error['error']['message']).toBe('No se ha podido eliminar el curso 30');

          // Indicamos que la función asíncrona ha terminado
          done();
        }
        );
    });
 

  });

});