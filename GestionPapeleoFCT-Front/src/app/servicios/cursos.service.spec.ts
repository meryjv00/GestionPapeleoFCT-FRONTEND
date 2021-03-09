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
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGY0N2VjMjcxMGE0Y2UzYTBhYzhhNWNhOGIxOTY3NDAyZTQ3ODcwNDEzMDhjZjE4N2VkYjFlNGM1MDEwYTZhM2Y1OWJkOGU5NDUwYjUwNjYiLCJpYXQiOiIxNjE1MzA3MTYwLjkxMDg0NyIsIm5iZiI6IjE2MTUzMDcxNjAuOTEwODQ5IiwiZXhwIjoiMTY0Njg0MzE2MC44NjU3ODgiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZOYONIt3U62pLwHtxKJVHlIgQ1Git2TlRg0t8K4iB0b_-o9XT0y9zIIVyOU0nODKG1kgodzeMRKB0iD7RFJ2XvHJJvpFzwjz6DhsigRgN3ZGkbY6X44ZR9xpsPUvqdz_IlthbtIYmYXnygmhfxwRkzUX3s--H22ytRyqsQaR8ipxZp2Cu4YsFqwneAVfylbdepNKcQb3kIRwNSbkkCOvJI78pj4x5UTIUQX2hliwXzNkwARbkddDCidDrkZDXfjt7Xd0l2IlNxEpgfyvycSnTBtnEm2b1N3lvD1Wn-IWIw6fVAcvVsGAkY_0ClMc48BmucoWYvpOuRLpa-1uAM6doUYKkeZucNu1Tr6fYkgit5xzs7U60WqKsXvc4eJY5-51Kg8j2Cspt-o2vjdukoLrbxgl1FLsqQDar2igcS8c5I9c7xdbDeXpztdMpFv90FUX8IqdUlBa54t3vVdtq_oHXMgptXOWrBuGkNP94_3hpXy2GJ-Q_RXng_xAPyGdRgD1dAxBxy6lysSXwirrez1jVoteWGdzzfgWfbksK9CuTav5dLBFx4U0wsOZvBrHVGba_rBRXoYNj1zyafeZFBXnYqjehZ8IAE_St8wXERLdYouDJM4QrpynzfG0xYvHIU5ZOSIKrVBuXAv_SVbca2o7fIAX9fRhniEzose38sMXPL4"
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
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGY0N2VjMjcxMGE0Y2UzYTBhYzhhNWNhOGIxOTY3NDAyZTQ3ODcwNDEzMDhjZjE4N2VkYjFlNGM1MDEwYTZhM2Y1OWJkOGU5NDUwYjUwNjYiLCJpYXQiOiIxNjE1MzA3MTYwLjkxMDg0NyIsIm5iZiI6IjE2MTUzMDcxNjAuOTEwODQ5IiwiZXhwIjoiMTY0Njg0MzE2MC44NjU3ODgiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZOYONIt3U62pLwHtxKJVHlIgQ1Git2TlRg0t8K4iB0b_-o9XT0y9zIIVyOU0nODKG1kgodzeMRKB0iD7RFJ2XvHJJvpFzwjz6DhsigRgN3ZGkbY6X44ZR9xpsPUvqdz_IlthbtIYmYXnygmhfxwRkzUX3s--H22ytRyqsQaR8ipxZp2Cu4YsFqwneAVfylbdepNKcQb3kIRwNSbkkCOvJI78pj4x5UTIUQX2hliwXzNkwARbkddDCidDrkZDXfjt7Xd0l2IlNxEpgfyvycSnTBtnEm2b1N3lvD1Wn-IWIw6fVAcvVsGAkY_0ClMc48BmucoWYvpOuRLpa-1uAM6doUYKkeZucNu1Tr6fYkgit5xzs7U60WqKsXvc4eJY5-51Kg8j2Cspt-o2vjdukoLrbxgl1FLsqQDar2igcS8c5I9c7xdbDeXpztdMpFv90FUX8IqdUlBa54t3vVdtq_oHXMgptXOWrBuGkNP94_3hpXy2GJ-Q_RXng_xAPyGdRgD1dAxBxy6lysSXwirrez1jVoteWGdzzfgWfbksK9CuTav5dLBFx4U0wsOZvBrHVGba_rBRXoYNj1zyafeZFBXnYqjehZ8IAE_St8wXERLdYouDJM4QrpynzfG0xYvHIU5ZOSIKrVBuXAv_SVbca2o7fIAX9fRhniEzose38sMXPL4"
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
