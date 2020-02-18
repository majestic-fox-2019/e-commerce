const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(() => {
  console.log('db closed')
  return sequelize.close()
})

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IkFkbWluMSIsImVtYWlsIjoiYWRtaW4xQG1haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0.9YWcy3G_mWUjoXWnLiXHboPBkTyA_eNMyfBEmR29B_4'

const nonAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0ZXIxMjMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZX0.pIn0WXDNprufg6K8VEhOUjRVMfjycHp0oTSwV21HwGs`

describe('Get All', () => {
  it('As admin, on success should return', (done) => {
    request(app)
      .get('/transactions/')
      .set('token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBeTruthy()
          expect(res.body[0]).toHaveProperty('UserId')
          expect(res.body[0]).toHaveProperty('ProductId')
          expect(res.body[0]).toHaveProperty('date_purchased')
          done()
        }
      })
  })

  it('As user, on success should return', (done) => {
    request(app)
      .get('/transactions/')
      .set('token', nonAdminToken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBeTruthy()
          expect(res.body[0]).toHaveProperty('UserId')
          expect(res.body[0]).toHaveProperty('ProductId')
          expect(res.body[0]).toHaveProperty('date_purchased')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .get('/transactions/')
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toMatch('Invalid access token')
        done()
      })
  })
})

// describe('Delete transaction data from list', () => {
//   it('On success should return', (done) => {
//     request(app)
//       .delete('/transactions/')
//       .set('token', token)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           done(err)
//         } else {
//           expect(typeof res.body).toBe('object')
//           expect(res.body).toHaveProperty('msg')
//           expect(res.body.msg.includes('Rows deleted')).toBeTruthy()
//           done()
//         }
//       })
//   })

//   it('On fail should return', (done) => {
//     request(app)
//       .delete('/carts/')
//       .expect(401)
//       .end((err, res) => {
//         if (err) {
//           done(err)
//         } else {
//           expect(typeof res.body).toBe('object')
//           expect(res.body).toHaveProperty('msg')
//           expect(res.body.msg).toMatch('Invalid access token')
//           done()
//         }
//       })
//   })
// })
