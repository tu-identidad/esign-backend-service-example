'use strict'

const ESignController = require('../controllers/ESignController')
const { celebrate, Joi, Segments } = require('celebrate')
const router = require('express').Router()

/**
 * @swagger
 * definitions:
 *   Signatory:
 *     type: object
 *     required:
 *       - identifier
 *       - name
 *       - firstName
 *       - lastName
 *       - rfc
 *       - email
 *       - document
 *       - showSignature
 *       - imageSignature
 *     properties:
 *       identifier:
 *         type: string
 *       name:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       rfc:
 *         type: string
 *       email:
 *         type: string
 *       document:
 *         type: string
 *       showSignature:
 *         type: number
 *       imageSignature:
 *         type: string
 * /v1/ESign/addSingleSignatory:
 *   post:
 *     tags:
 *         - ESign
 *     description: Add the signatory to the document
 *     produces:
 *         - application/json
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/Signatory'
 *     responses:
 *       200:
 *          description: New docuement with signatory
 */
router.post('/v1/ESign/addSingleSignatory', [
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      identifier: Joi.string().required(),
      name: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      rfc: Joi.string().required(),
      email: Joi.string().required(),
      document: Joi.string().required(),
      showSignature: Joi.number().integer().required().min(0).max(1),
      imageSignature: Joi.string().required()
    })
  })
], ESignController.addSingleSignatory)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Token:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # optional, for documentation purposes only
 * definitions:
 *   getDocumentRequest:
 *     type: object
 *     required:
 *       - identifier
 *     properties:
 *       identifier:
 *         type: string
 * /v1/ESign/getDocument:
 *   post:
 *     tags:
 *         - ESign
 *     description: Download signed document
 *     produces:
 *         - application/json
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/getDocumentRequest'
 *     responses:
 *       200:
 *          description: Download signed document
 */
router.post('/v1/ESign/getDocument', [
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      identifier: Joi.string().required(),
    })
  })
], ESignController.downloadDocument)

module.exports = router
