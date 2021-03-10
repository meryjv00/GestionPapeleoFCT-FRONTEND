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
 /*    it('Lista cursos correcta', (done: DoneFn) => {
      //Act
      var user = {
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGY0N2VjMjcxMGE0Y2UzYTBhYzhhNWNhOGIxOTY3NDAyZTQ3ODcwNDEzMDhjZjE4N2VkYjFlNGM1MDEwYTZhM2Y1OWJkOGU5NDUwYjUwNjYiLCJpYXQiOiIxNjE1MzA3MTYwLjkxMDg0NyIsIm5iZiI6IjE2MTUzMDcxNjAuOTEwODQ5IiwiZXhwIjoiMTY0Njg0MzE2MC44NjU3ODgiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZOYONIt3U62pLwHtxKJVHlIgQ1Git2TlRg0t8K4iB0b_-o9XT0y9zIIVyOU0nODKG1kgodzeMRKB0iD7RFJ2XvHJJvpFzwjz6DhsigRgN3ZGkbY6X44ZR9xpsPUvqdz_IlthbtIYmYXnygmhfxwRkzUX3s--H22ytRyqsQaR8ipxZp2Cu4YsFqwneAVfylbdepNKcQb3kIRwNSbkkCOvJI78pj4x5UTIUQX2hliwXzNkwARbkddDCidDrkZDXfjt7Xd0l2IlNxEpgfyvycSnTBtnEm2b1N3lvD1Wn-IWIw6fVAcvVsGAkY_0ClMc48BmucoWYvpOuRLpa-1uAM6doUYKkeZucNu1Tr6fYkgit5xzs7U60WqKsXvc4eJY5-51Kg8j2Cspt-o2vjdukoLrbxgl1FLsqQDar2igcS8c5I9c7xdbDeXpztdMpFv90FUX8IqdUlBa54t3vVdtq_oHXMgptXOWrBuGkNP94_3hpXy2GJ-Q_RXng_xAPyGdRgD1dAxBxy6lysSXwirrez1jVoteWGdzzfgWfbksK9CuTav5dLBFx4U0wsOZvBrHVGba_rBRXoYNj1zyafeZFBXnYqjehZ8IAE_St8wXERLdYouDJM4QrpynzfG0xYvHIU5ZOSIKrVBuXAv_SVbca2o7fIAX9fRhniEzose38sMXPL4"
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
          console.log(error['error']);

          // Indicamos que la función asíncrona ha terminado
          done();
        }
      );
    }); */

  });

});
