var moment = require('moment');

;(function(){
  'use strict';

  var filters = require('../components/filters')

  module.exports.getPdfDocumentDescription = function(juror, texts) {
    return {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 150, 40, 40],
      defaultStyle: {
        font: 'OpenSans'
      },
      header: {
        layout: 'noBorders',
        table: {
          headerRows: 0,
          widths: [250, '*'],
          body: [
            [{
              text: texts.sharedText.mainHeader,
              style: 'mainHeader'
            },
            {
              image: texts.sharedText.logo,
              width: 130,
              alignment: 'right'
            }
            ]
          ]
        },
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 40,
        marginRight: 40
      },
      footer: function(currentPage, pageCount) {
        return {
          text: currentPage + texts.sharedText.pageNumber + pageCount,
          alignment: 'right',
          marginRight: 40
        };
      },
      content: [

        //////////////////////////////////////////////////////
        // Section 1
        //////////////////////////////////////////////////////
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            body: [
              [{
                text: texts.jurorPDF.nameHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.nameRender,
                marginBottom: 3
              }],
              [{
                text: texts.sharedText.jurorNumberHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.jurorNumber,
                marginBottom: 3
              }],
              [{
                text: texts.jurorPDF.replyDateHeader,
                style: 'courtHeadings'
              }],
              [{
                text: filters.translateDate(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 3
              }]
            ]
          }
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.detailsHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            widths: ['50%', '50%'],
            body: [
              [{
                text: texts.sharedText.court,
                style: 'courtHeadings'
              },
              {
                text: texts.sharedText.date,
                style: 'courtHeadings'
              },
              ],
              [{
                text: juror.courtAddress.replace(/\<br\>/g, '\n'),
                rowSpan: 3
              },
              {
                text: filters.translateDate(juror.hearingDateShort, 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 15
              }
              ],
              [
                '',
                {
                  text: texts.sharedText.startTime,
                  style: 'courtHeadings'
                }
              ],
              [
                '',
                {
                  text: juror.hearingTime
                }
              ]
            ]
          },
          marginBottom: 40
        },
        {
          text: [
            juror.deferral ? texts.jurorPDF.deferral : juror.excusal ? texts.jurorPDF.excusal : texts.jurorPDF.confirmation,
          ],
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        {
          text: texts.whatHappensNext.header,
          style: 'bigBold',
          marginBottom: 10
        },
        //excusal, ineligible + adjustment
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalIneligibleAdjustmentLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, ineligible + adjustment
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalIneligibleAdjustmentLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //ST, eligible + no adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughEligibleNoAdjustment : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //ST, eligible + adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughOrDeferralWithAdjustmentLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //ST, ineligable + no adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineTwo : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineThree : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //ST, ineligable + adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleLineTwo : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleWithAdjustmentLineThree : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, eligible + adjustment
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughOrDeferralWithAdjustmentLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.deferralWithAdjustmentLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.deferralLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, eligible + no adjustment
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //deferral, ineligable + no adjustment
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralIneligibleLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },

        //excusal, eligible + adjustment
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalEligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalWithAdjustmentLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //excusal, eligible + no adjustment
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalEligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //excusal, ineligable + no adjustment
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalIneligibleLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          ul: [
            texts.whatHappensNext.bulletPointOne
          ],
          marginBottom: 10
        },
        {
          ul: [
            texts.whatHappensNext.bulletPointTwo
          ],
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 20
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustAssistanceInfo : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20,
          pageBreak: 'after'
        },
        //////////////////////////////////////////////////////
        // Section 2
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.jurorPDF.jurorDetails,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.nameHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.nameRender,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.addressHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.addressRender.replace(/\<br\>/g, ', '),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.dobHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: filters.translateDate(moment(juror.dateOfBirth).format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.mainPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.primaryPhone,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.otherPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: '\n' + (juror.secondaryPhone || ''),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.emailHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.emailAddress,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 20,
          pageBreak: juror.ineligible === 'Yes' ? 'after' : 'none'
        },
        {
          text: juror.ineligible === 'Yes' ? texts.sharedText.howYouReplied : '',
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.ineligible === 'Yes' ? 3 : 0,
            lineColor: juror.ineligible === 'Yes' ? '#000' : '#fff'
          }],
          marginBottom: juror.ineligible === 'Yes' ? 20 : 0
        },
        //Qualify - Header
        {
          text: texts.jurorPDF.qualifyQuestionsHeader,
          style: 'smallBold',
          marginBottom: 10
        },

        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        //Qualify - Residency
        {
          text: texts.jurorPDF.residencyQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.livedConsecutive.details ? texts.jurorPDF.residencyNo : texts.jurorPDF.residencyYes,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.livedConsecutive.details ? juror.qualify.livedConsecutive.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - CJS Employment
        {
          text: texts.jurorPDF.employmentQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.cjsEmployed === texts.jurorPDF.employmentQuestionYes ? texts.jurorPDF.employmentQuestionYes : texts.jurorPDF.employmentQuestionNo,
          style: 'textReg',
          marginBottom: 5
        },
        {
          text: juror.cjsPoliceDetails ? texts.sharedText.policeForce : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsPoliceDetails,
          style: 'textReg',
          marginBottom: juror.cjsPoliceDetails ? 5 : 0
        },
        {
          text: juror.cjsPrisonDetails ? texts.sharedText.prisonService : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsPrisonDetails,
          style: 'textReg',
          marginBottom: juror.cjsPrisonDetails ? 5 : 0
        },
        {
          text: juror.cjsNca ? texts.sharedText.nationalCrimeAgency : '',
          style: 'smallBold',
          marginBottom: juror.cjsNca ? 5 : 0
        },
        {
          text: juror.cjsJudiciary ? texts.sharedText.judiciary : '',
          style: 'smallBold',
          marginBottom: juror.cjsJudiciary ? 5 : 0
        },
        {
          text: juror.cjsHMCTS ? texts.sharedText.hmcts : '',
          style: 'smallBold',
          marginBottom: juror.cjsHMCTS ? 5 : 0
        },
        {
          text: juror.cjsEmployerDetails ? texts.sharedText.other : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsEmployerDetails,
          style: 'textReg',
          marginBottom: juror.cjsEmployerDetails ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Bail
        {
          text: texts.jurorPDF.bailQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.onBail.details ? texts.jurorPDF.bailYes : texts.jurorPDF.bailNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.onBail.details ? juror.qualify.onBail.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Convictions
        {
          text: texts.jurorPDF.convictionsQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.convicted.details ? texts.jurorPDF.convictionsYes : texts.jurorPDF.convictionsNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.convicted.details ? juror.qualify.convicted.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Mental Health Sectioned
        {
          text: texts.jurorPDF.mentalHealthSectioned,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthSectioned.details ? texts.jurorPDF.mentalHealthSectionedYes : texts.jurorPDF.mentalHealthSectionedNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthSectioned.details ? juror.qualify.mentalHealthSectioned.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        //Qualify - Mental Health Capacity
        {
          text: texts.jurorPDF.mentalHealthCapacity,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthCapacity.details ? texts.jurorPDF.mentalHealthCapacityYes : texts.jurorPDF.mentalHealthCapacityNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthCapacity.details ? juror.qualify.mentalHealthCapacity.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10,
          pageBreak: 'after'
        },


        //////////////////////////////////////////////////////
        // Section 3
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3

          }],
          marginBottom: 20
        },

        {
          text: texts.jurorPDF.dateResponse,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: texts.jurorPDF.confirmDate,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.confirmedDate === 'Yes' ? texts.jurorPDF.dateConfirmed : juror.excusal ? texts.jurorPDF.requireExcusal : texts.jurorPDF.requireDeferral,
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 10 : 20
        },
        {
          text: juror.excusal ? texts.jurorPDF.excusalDetailsHeader : juror.deferral ? texts.jurorPDF.deferralDetailsHeader : '',
          style: 'smallBold',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.confirmedDate === 'Yes' ? 0 : 1,
            lineColor: juror.confirmedDate === 'Yes' ? '#fff' : '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          text: juror.excusal ? texts.jurorPDF.excusalReason : juror.deferral ? texts.jurorPDF.deferralReason : '',
          style: 'smallDull',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          text: juror.excusal ? juror.excusal.reason : juror.deferral ? juror.deferral.reason : '',
          style: 'textReg',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.confirmedDate === 'Yes' ? 0 : 1,
            lineColor: juror.confirmedDate === 'Yes' ? '#fff' : '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 20
        },
        {
          text: juror.deferral ? texts.jurorPDF.threeDates : '',
          style: 'smallDull',
          marginBottom: juror.deferral ? 10 : 0
        },
        {
          text: juror.deferral ? texts.jurorPDF.deferralDate1Label + '\n' + filters.translateDate(juror.deferral.displayDates['date1'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang) + '\n\n' + texts.jurorPDF.deferralDate2Label + '\n' + filters.translateDate(juror.deferral.displayDates['date2'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang) + '\n\n' + texts.jurorPDF.deferralDate3Label + '\n' + filters.translateDate(juror.deferral.displayDates['date3'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang)  : '',
          style: 'textReg',
          marginBottom: juror.deferral ? 5 : 0
        },
        {
          canvas: [ juror.deferral ? {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          } : {}],
          marginBottom: juror.deferral ? 20 : 0
        },

        //CJS Employment moved to Eligibility

        //Assistance in court
        {
          text: texts.jurorPDF.helpHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: texts.jurorPDF.helpDetails,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.assistanceTypeOutput ? texts.jurorPDF.helpDetailsYes : texts.jurorPDF.helpDetailsNo,
          style: 'textReg',
          marginBottom: 5
        },
        {
          text: juror.assistanceTypeOutput ? juror.assistanceTypeOutput : '',
          style: 'textReg',
          marginBottom: juror.assistanceTypeDetails ? 10 : juror.assistanceTypeOutput ? 5 : 0
        },
        {
          text: juror.assistanceTypeDetails ? texts.sharedText.other : '',
          style: 'textReg'
        },
        {
          text: juror.assistanceTypeDetails ? juror.assistanceTypeDetails : '',
          style: 'textReg',
          marginBottom: juror.assistanceTypeDetails ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: juror.assistanceSpecialArrangements ? texts.jurorPDF.specialArrangementDetails : '',
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.assistanceSpecialArrangements ? juror.assistanceSpecialArrangements : '',
          style: 'textReg',
          marginBottom: juror.assistanceSpecialArrangements ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: juror.assistanceSpecialArrangements ? '#ccc' : '#fff'
          }],
          marginBottom: 20,
          pageBreak: 'after'
        },
        //////////////////////////////////////////////////////
        // Section 4
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.getReadyHeader,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },

        {
          text: texts.sharedText.govWebsiteText,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: [
            texts.sharedText.visit,
            {
              text: texts.sharedText.govWebsiteLink,
              link: texts.sharedText.govWebsiteLink,
              color: 'blue'
            },
            texts.sharedText.toLearnMoreAbout
          ],
          marginBottom: 20
        },
        {
          ul: [{
            text: texts.sharedText.govPointOne,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointTwo,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointThree,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointFour,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointFive,
            marginBottom: 10
          }
          ]
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.contactingHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoOne,
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoSummoningBureau
        },
        {
          text: texts.sharedText.contactingInfoEmailText,
          link: texts.sharedText.contactingInfoEmailLink,
          color: 'blue'
        },
        {
          text: texts.sharedText.contactingInfoTelOne
        },
        {
          text: texts.sharedText.contactingInfoTelTwo ? texts.sharedText.contactingInfoTelTwo : ''
        },
        {
          text: texts.sharedText.contactingInfoDaysOne
        },
        {
          text: texts.sharedText.contactingInfoDaysTwo
        },
        {
          text: texts.sharedText.contactingInfoCallChargesText,
          link: texts.sharedText.contactingInfoCallChargesLink,
          color: 'blue'
        },
      ],
      styles: {
        mainHeader: {
          fontSize: 23,
          bold: true,
        },
        bigBold: {
          fontSize: 17,
          bold: true
        },
        smallBold: {
          bold: true,
          fontSize: 12
        },
        textReg: {
          fontSize: 12
        },
        smallDull: {
          fontSize: 12,
          color: '#666'
        },
        courtHeadings: {
          fontSize: 11,
          bold: true
        }
      }
    };
  }

  module.exports.getPdfDocumentDescriptionThirdParty = function(juror, texts) {
    return {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 150, 40, 40],
      defaultStyle: {
        font: 'OpenSans'
      },
      header: {
        layout: 'noBorders',
        table: {
          headerRows: 0,
          widths: [250, '*'],
          body: [
            [{
              text: texts.sharedText.mainHeader,
              style: 'mainHeader'
            },
            {
              image: texts.sharedText.logo,
              width: 130,
              alignment: 'right'
            }
            ]
          ]
        },
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 40,
        marginRight: 40
      },
      footer: function(currentPage, pageCount) {
        return {
          text: currentPage + texts.sharedText.pageNumber + pageCount,
          alignment: 'right',
          marginRight: 40
        };
      },
      content: [

        //////////////////////////////////////////////////////
        // Section 1
        //////////////////////////////////////////////////////
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            body: [
              [{
                text: texts.jurorPDF.nameHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.nameRender,
                marginBottom: 3
              }],
              [{
                text: texts.sharedText.jurorNumberHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.jurorNumber,
                marginBottom: 3
              }],
              [{
                text: texts.jurorPDF.replyDateHeader,
                style: 'courtHeadings'
              }],
              [{
                text: filters.translateDate(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 3
              }]
            ]
          }
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.detailsHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            widths: ['50%', '50%'],
            body: [
              [{
                text: texts.sharedText.court,
                style: 'courtHeadings'
              },
              {
                text: texts.sharedText.date,
                style: 'courtHeadings'
              },
              ],
              [{
                text: juror.courtAddress.replace(/\<br\>/g, '\n'),
                rowSpan: 3
              },
              {
                text: filters.translateDate(juror.hearingDateShort, 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 15
              }
              ],
              [
                '',
                {
                  text: texts.sharedText.startTime,
                  style: 'courtHeadings'
                }
              ],
              [
                '',
                {
                  text: juror.hearingTime
                }
              ]
            ]
          },
          marginBottom: 40
        },
        {
          text: [
            juror.deferral ? texts.jurorPDF.deferral : juror.excusal ? texts.jurorPDF.excusal : texts.jurorPDF.confirmation,
          ],
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        {
          text: texts.whatHappensNext.header,
          style: 'bigBold',
          marginBottom: 10
        },
        //excusal, ineligible + adjustment
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalIneligibleAdjustmentLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, ineligible + adjustment
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalIneligibleAdjustmentLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //ST, eligible + no adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughEligibleNoAdjustment : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //ST, eligible + adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughOrDeferralWithAdjustmentLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //ST, ineligable + no adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineTwo : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.straightThroughIneligibleLineThree : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //ST, ineligable + adjustment
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleLineOne : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleLineTwo : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughIneligibleWithAdjustmentLineThree : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.confirmedDate === 'Yes' && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, eligible + adjustment
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.straightThroughOrDeferralWithAdjustmentLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.deferralWithAdjustmentLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.deferralLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //deferral, eligible + no adjustment
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //deferral, ineligable + no adjustment
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.deferralIneligibleLineTwo : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifAbleLastLine : '',
          marginBottom: juror.deferral && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },

        //excusal, eligible + adjustment
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalEligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.excusalWithAdjustmentLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        //excusal, eligible + no adjustment
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalEligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        //excusal, ineligable + no adjustment
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalOrDeferralAndIneligibleLineOne : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.excusalIneligibleLineTwo : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.inTouchInSevenDays : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          text: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? texts.whatHappensNext.ifMustLastLine : '',
          marginBottom: juror.excusal && juror.ineligible === 'Yes' && juror.assistanceNeeded === 'No' ? 10 : 0
        },
        {
          ul: [
            texts.whatHappensNext.bulletPointOne
          ],
          marginBottom: 10
        },
        {
          ul: [
            texts.whatHappensNext.bulletPointTwo
          ],
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 20
        },
        {
          text: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? texts.whatHappensNext.ifMustAssistanceInfo : '',
          marginBottom: juror.excusal && juror.ineligible === 'No' && juror.assistanceNeeded === 'Yes' ? 10 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20,
          pageBreak: 'after'
        },
        //////////////////////////////////////////////////////
        // Section 2
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.thirdPartyPDF.jurorDetailsHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            // change to shared
            text: texts.sharedText.name,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.nameRender,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            // change to shared
            text: texts.jurorPDF.addressHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.addressRender.replace(/\<br\>/g, ', '),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.dobHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: filters.translateDate(moment(juror.dateOfBirth).format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            // change to shared
            text: texts.jurorPDF.mainPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.primaryPhone || '',
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            // change to shared
            text: texts.jurorPDF.otherPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: '\n' + (juror.secondaryPhone || ''),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            // change to shared
            text: texts.jurorPDF.emailHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.emailAddress || '',
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 20
        },
        {
          text: texts.thirdPartyPDF.thirdPartyDetailsHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyName,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.nameRender,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            width: '20%',
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyRelationship,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.relationship,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyMainPhone,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.mainPhone || '',
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyAlternativePhone,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.otherPhone || '',
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyEmail,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.emailAddress || '',
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.thirdPartyPDF.thirdPartyReason,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdPartyDetails.reasonText,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10,
          pageBreak: 'after'
        },
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },

        //Qualify - Header
        {
          text: texts.thirdPartyPDF.qualifyHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Residency
        {
          text: texts.thirdPartyPDF.residencyQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.livedConsecutive.details ? texts.thirdPartyPDF.residencyNo : texts.thirdPartyPDF.residencyYes,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.livedConsecutive.details ? juror.qualify.livedConsecutive.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //CJS Employed
        {
          text: texts.thirdPartyPDF.employmentQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.cjsEmployed === texts.thirdPartyPDF.employmentQuestionYes ? texts.thirdPartyPDF.employmentQuestionYes : texts.thirdPartyPDF.employmentQuestionNo,
          style: 'textReg',
          marginBottom: 5
        },
        {
          text: juror.cjsPoliceDetails ? texts.sharedText.policeForce : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsPoliceDetails,
          style: 'textReg',
          marginBottom: juror.cjsPoliceDetails ? 5 : 0
        },
        {
          text: juror.cjsPrisonDetails ? texts.sharedText.prisonService : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsPrisonDetails,
          style: 'textReg',
          marginBottom: juror.cjsPrisonDetails ? 5 : 0
        },
        {
          text: juror.cjsNca ? texts.sharedText.nationalCrimeAgency : '',
          style: 'smallBold',
          marginBottom: juror.cjsNca ? 5 : 0
        },
        {
          text: juror.cjsJudiciary ? texts.sharedText.judiciary : '',
          style: 'smallBold',
          marginBottom: juror.cjsJudiciary ? 5 : 0
        },
        {
          text: juror.cjsHMCTS ? texts.sharedText.hmcts : '',
          style: 'smallBold',
          marginBottom: juror.cjsHMCTS ? 5 : 0
        },
        {
          text: juror.cjsEmployerDetails ? texts.sharedText.other : '',
          style: 'smallBold',
          marginBottom: 0
        },
        {
          text: juror.cjsEmployerDetails,
          style: 'textReg',
          marginBottom: juror.cjsEmployerDetails ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 20,
          pageBreak: juror.assistanceTypeOutput ? 'after' : 'none'
        },

        //Qualify - Bail
        {
          text: texts.thirdPartyPDF.bailQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.onBail.details ? texts.thirdPartyPDF.bailYes : texts.thirdPartyPDF.bailNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.onBail.details ? juror.qualify.onBail.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Convictions
        {
          text: texts.thirdPartyPDF.convictionsQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.convicted.details ? texts.thirdPartyPDF.convictionsYes : texts.thirdPartyPDF.convictionsNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.convicted.details ? juror.qualify.convicted.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },

        //Qualify - Mental Health Sectioned
        {
          text: texts.thirdPartyPDF.mentalHealthSectioned,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthSectioned.details ? texts.thirdPartyPDF.mentalHealthSectionedYes : texts.thirdPartyPDF.mentalHealthSectionedNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthSectioned.details ? juror.qualify.mentalHealthSectioned.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        //Qualify - Mental Health Capacity
        {
          text: texts.thirdPartyPDF.mentalHealthCapacity,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthCapacity.details ? texts.thirdPartyPDF.mentalHealthCapacityYes : texts.thirdPartyPDF.mentalHealthCapacityNo,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: juror.qualify.mentalHealthCapacity.details ? juror.qualify.mentalHealthCapacity.details : '',
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10,
          pageBreak: 'after'
        },


        //////////////////////////////////////////////////////
        // Section 3
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },

        {
          text: texts.thirdPartyPDF.dateResponseHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: texts.thirdPartyPDF.confirmDateQuestion,
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.confirmedDate === 'Yes' ? texts.thirdPartyPDF.dateConfirmed : juror.excusal ? texts.thirdPartyPDF.requireExcusal : texts.thirdPartyPDF.requireDeferral,
          style: 'textReg',
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 10 : 20
        },
        {
          text: juror.excusal ? texts.thirdPartyPDF.excusalHeader : juror.deferral ? texts.thirdPartyPDF.deferralHeader : '',
          style: 'smallBold',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.confirmedDate === 'Yes' ? 0 : 1,
            lineColor: juror.confirmedDate === 'Yes' ? '#fff' : '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          text: juror.excusal ? texts.thirdPartyPDF.excusalReason : juror.deferral ? texts.thirdPartyPDF.deferralReason : '',
          style: 'smallDull',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 10
        },
        {
          text: juror.excusal ? juror.excusal.reason : juror.deferral ? juror.deferral.reason : '',
          style: 'textReg',
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.confirmedDate === 'Yes' ? 0 : 1,
            lineColor: juror.confirmedDate === 'Yes' ? '#fff' : '#ccc'
          }],
          marginBottom: juror.confirmedDate === 'Yes' ? 0 : 20
        },
        {
          text: juror.deferral ? texts.thirdPartyPDF.deferralDates : '',
          style: 'smallDull',
          marginBottom: juror.deferral ? 10 : 0
        },
        {
          text: juror.deferral ? texts.jurorPDF.deferralDate1Label + '\n' + filters.translateDate(juror.deferral.displayDates['date1'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang) + '\n\n' + texts.jurorPDF.deferralDate2Label + '\n' + filters.translateDate(juror.deferral.displayDates['date2'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang) + '\n\n' + texts.jurorPDF.deferralDate3Label + '\n' + filters.translateDate(juror.deferral.displayDates['date3'], 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang)  : '',
          style: 'textReg',
          marginBottom: juror.deferral ? 10 : 0
        },
        {
          canvas: [ juror.deferral ? {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          } : {}],
          marginBottom: juror.deferral ? 20 : 0
        },

        //CJS Employment moved to Qualify

        //Assistance in court
        {
          text: juror.assistanceTypeOutput ? texts.sharedText.howYouReplied : '',
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.assistanceTypeOutput ? 3 : 0,
            lineColor: juror.assistanceTypeOutput ? '#000' : '#fff'
          }],
          marginBottom: juror.assistanceTypeOutput ? 20 : 0
        },
        //Assistance
        {
          text: texts.thirdPartyPDF.assistanceHeader,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: texts.thirdPartyPDF.disabilityQuestion,
          style: 'smallDull',
        },
        {
          text: juror.assistanceTypeOutput ? texts.thirdPartyPDF.disabilityQuestionYes : texts.thirdPartyPDF.disabilityQuestionNo,
          style: 'textReg',
          marginBottom: 5
        },
        {
          text: juror.assistanceTypeOutput ? juror.assistanceTypeOutput : '',
          style: 'textReg',
          marginBottom: juror.assistanceTypeDetails ? 10 : juror.assistanceTypeOutput ? 5 : 0
        },
        {
          text: juror.assistanceTypeDetails ? texts.sharedText.other : '',
          style: 'textReg'
        },
        {
          text: juror.assistanceTypeDetails ? juror.assistanceTypeDetails : '',
          style: 'textReg',
          marginBottom: juror.assistanceTypeDetails ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          text: juror.assistanceSpecialArrangements ? texts.thirdPartyPDF.specialArrangements : '',
          style: 'smallDull',
          marginBottom: 10
        },
        {
          text: juror.assistanceSpecialArrangements ? juror.assistanceSpecialArrangements : '',
          style: 'textReg',
          marginBottom: juror.assistanceSpecialArrangements ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: juror.assistanceSpecialArrangements ? '#ccc' : '#fff'
          }],
          marginBottom: 20,
          pageBreak: 'after'
        },


        //////////////////////////////////////////////////////
        // Section 4
        //////////////////////////////////////////////////////
        {
          text: texts.sharedText.getReadyHeader,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },

        {
          text: texts.sharedText.govWebsiteText,
          style: 'textReg',
          marginBottom: 10
        },
        {
          text: [
            texts.sharedText.visit,
            {
              text: texts.sharedText.govWebsiteLink,
              link: texts.sharedText.govWebsiteLink,
              color: 'blue'
            },
            texts.sharedText.toLearnMoreAbout
          ],
          marginBottom: 20
        },
        {
          ul: [{
            text: texts.sharedText.govPointOne,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointTwo,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointThree,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointFour,
            marginBottom: 10
          },
          {
            text: texts.sharedText.govPointFive,
            marginBottom: 10
          }
          ]
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.contactingHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoOne,
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoSummoningBureau
        },
        {
          text: texts.sharedText.contactingInfoEmailText,
          link: texts.sharedText.contactingInfoEmailLink,
          color: 'blue'
        },
        {
          text: texts.sharedText.contactingInfoTelOne
        },
        {
          text: texts.sharedText.contactingInfoTelTwo ? texts.sharedText.contactingInfoTelTwo : ''
        },
        {
          text: texts.sharedText.contactingInfoDaysOne
        },
        {
          text: texts.sharedText.contactingInfoDaysTwo
        },
        {
          text: texts.sharedText.contactingInfoCallChargesText,
          link: texts.sharedText.contactingInfoCallChargesLink,
          color: 'blue'
        },
      ],
      styles: {
        mainHeader: {
          fontSize: 23,
          bold: true,
        },
        bigBold: {
          fontSize: 17,
          bold: true
        },
        smallBold: {
          bold: true,
          fontSize: 12
        },
        textReg: {
          fontSize: 12
        },
        smallDull: {
          fontSize: 12,
          color: '#666'
        },
        courtHeadings: {
          fontSize: 11,
          bold: true
        }
      }
    };
  }

  module.exports.getPdfDocumentDescriptionDeceased = function(juror, texts) {
    return {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 150, 40, 40],
      defaultStyle: {
        font: 'OpenSans'
      },
      header: {
        layout: 'noBorders',
        table: {
          headerRows: 0,
          widths: [250, '*'],
          body: [
            [{
              text: texts.sharedText.mainHeader,
              style: 'mainHeader'
            },
            {
              image: texts.sharedText.logo,
              width: 130,
              alignment: 'right'
            }
            ]
          ]
        },
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 40,
        marginRight: 40
      },
      footer: function(currentPage, pageCount) {
        return {
          text: currentPage + texts.sharedText.pageNumber + pageCount,
          alignment: 'right',
          marginRight: 40
        };
      },
      content: [

        //////////////////////////////////////////////////////
        // Section 1
        //////////////////////////////////////////////////////
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            body: [
              [{
                text: texts.jurorPDF.nameHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.nameRender,
                marginBottom: 3
              }],
              [{
                text: texts.sharedText.jurorNumberHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.jurorNumber,
                marginBottom: 3
              }],
              [{
                text: texts.jurorPDF.replyDateHeader,
                style: 'courtHeadings'
              }],
              [{
                text: filters.translateDate(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 3
              }]
            ]
          }
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.detailsHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            widths: ['50%', '50%'],
            body: [
              [{
                text: texts.sharedText.court,
                style: 'courtHeadings'
              },
              {
                text: texts.sharedText.date,
                style: 'courtHeadings'
              },
              ],
              [{
                text: juror.courtAddress.replace(/\<br\>/g, '\n'),
                rowSpan: 3
              },
              {
                text: filters.translateDate(juror.hearingDateShort, 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 15
              }
              ],
              [
                '',
                {
                  text: texts.sharedText.startTime,
                  style: 'courtHeadings'
                }
              ],
              [
                '',
                {
                  text: juror.hearingTime
                }
              ]
            ]
          },
          marginBottom: 40
        },
        {
          text: texts.deceasedPDF.jurorDeceased,
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        {
          text: texts.whatHappensNext.header,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.deceasedPDF.nothingElse,
          marginBottom: 20
        },
        {
          text: texts.deceasedPDF.distressTitle,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.deceasedPDF.distressApology,
          marginBotton: 20
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginTop: 20,
          marginBottom: 20,
        },
        {
          text: texts.deceasedPDF.summoningBureau,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.deceasedPDF.contactDetailsOne,
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoSummoningBureau
        },
        {
          text: texts.sharedText.contactingInfoEmailText,
          link: texts.sharedText.contactingInfoEmailLink,
          color: 'blue'
        },
        {
          text: texts.sharedText.contactingInfoTelOne
        },
        {
          text: texts.sharedText.contactingInfoTelTwo ? texts.sharedText.contactingInfoTelTwo : ''
        },
        {
          text: texts.sharedText.contactingInfoDaysOne
        },
        {
          text: texts.sharedText.contactingInfoDaysTwo
        },
        {
          text: texts.sharedText.contactingInfoCallChargesText,
          link: texts.sharedText.contactingInfoCallChargesLink,
          color: 'blue'
        },
      ],
      styles: {
        mainHeader: {
          fontSize: 23,
          bold: true,
        },
        bigBold: {
          fontSize: 17,
          bold: true
        },
        smallBold: {
          bold: true,
          fontSize: 12
        },
        textReg: {
          fontSize: 12
        },
        smallDull: {
          fontSize: 12,
          color: '#666'
        },
        courtHeadings: {
          fontSize: 11,
          bold: true
        }
      }
    };
  };

  module.exports.getPdfDocumentDescriptionIneligibleAge = function(juror, texts) {
    return {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 150, 40, 40],
      defaultStyle: {
        font: 'OpenSans'
      },
      header: {
        layout: 'noBorders',
        table: {
          headerRows: 0,
          widths: [250, '*'],
          body: [
            [{
              text: texts.sharedText.mainHeader,
              style: 'mainHeader'
            },
            {
              image: texts.sharedText.logo,
              width: 130,
              alignment: 'right'
            }
            ]
          ]
        },
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 40,
        marginRight: 40
      },
      footer: function(currentPage, pageCount) {
        return {
          text: currentPage + texts.sharedText.pageNumber + pageCount,
          alignment: 'right',
          marginRight: 40
        };
      },
      content: [

        //////////////////////////////////////////////////////
        // Section 1
        //////////////////////////////////////////////////////
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            body: [
              [{
                text: texts.jurorPDF.nameHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.nameRender,
                marginBottom: 3
              }],
              [{
                text: texts.sharedText.jurorNumberHeader,
                style: 'courtHeadings'
              }],
              [{
                text: juror.jurorNumber,
                marginBottom: 3
              }],
              [{
                text: texts.jurorPDF.replyDateHeader,
                style: 'courtHeadings'
              }],
              [{
                text: filters.translateDate(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 3
              }]
            ]
          }
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        {
          text: texts.sharedText.detailsHeader,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          layout: 'noBorders',
          table: {
            headerRows: 0,
            widths: ['50%', '50%'],
            body: [
              [{
                text: texts.sharedText.court,
                style: 'courtHeadings'
              },
              {
                text: texts.sharedText.date,
                style: 'courtHeadings'
              },
              ],
              [{
                text: juror.courtAddress.replace(/\<br\>/g, '\n'),
                rowSpan: 3
              },
              {
                text: filters.translateDate(juror.hearingDateShort, 'DD/MM/YYYY', 'dddd D MMMM YYYY', texts.sharedText.lang),
                marginBottom: 15
              }
              ],
              [
                '',
                {
                  text: texts.sharedText.startTime,
                  style: 'courtHeadings'
                }
              ],
              [
                '',
                {
                  text: juror.hearingTime
                }
              ]
            ]
          },
          marginBottom: 40
        },
        {
          text: texts.ageIneligiblePDF.ageIneligibleInfo,
          marginBottom: 20
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20
        },
        // What Happens Next
        {
          text: texts.whatHappensNext.header,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.ageIneligiblePDF.pointOne,
          marginBottom: 10
        },
        {
          text: texts.ageIneligiblePDF.pointTwo,
          marginBottom: 10
        },
        {
          text: texts.ageIneligiblePDF.pointThree,
          marginBottom: 20
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1.5
          }],
          marginBottom: 20,
          //pageBreak: juror.thirdParty === 'Yes' ? 'after' : ''
          pageBreak: 'after'
        },
        {
          text: texts.sharedText.howYouReplied,
          style: 'bigBold'
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 3
          }],
          marginBottom: 20
        },
        //
        // Juror Details
        //
        {
          text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.jurorDetailsHeader : texts.jurorPDF.jurorDetails,
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.nameHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.nameRender,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.addressHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.addressRender.replace(/\<br\>/g, ', '),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.dobHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: filters.translateDate(moment(juror.dateOfBirth).format('DD/MM/YYYY'), 'DD/MM/YYYY', 'D MMMM YYYY', texts.sharedText.lang),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.mainPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.primaryPhone,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.otherPhoneHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: '\n' + (juror.secondaryPhone || ''),
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 10
        },
        {
          columns: [{
            text: texts.jurorPDF.emailHeader,
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.emailAddress,
            width: '*'
          }
          ],
          marginBottom: 5
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: 1,
            lineColor: '#ccc'
          }],
          marginBottom: 20
        },
        // Third Party Details
        {
          text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyDetailsHeader : '',
          style: 'smallBold',
          marginBottom: 10
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 3 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#000' : '#fff'
          }],
          marginBottom: 20
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyName : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes' ? juror.thirdPartyDetails.nameRender : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#ccc' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 10 : 0
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyRelationship : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes' ? juror.thirdPartyDetails.relationship : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#ccc' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 10 : 0
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyMainPhone : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes' ? juror.thirdPartyDetails.mainPhone : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#ccc' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 10 : 0
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyAlternativePhone : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes' ? juror.thirdPartyDetails.otherPhone : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#ccc' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 10 : 0
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyEmail : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes' ? juror.thirdPartyDetails.emailAddress : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#ccc' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 10 : 0
        },
        {
          columns: [{
            text: juror.thirdParty === 'Yes' ? texts.thirdPartyPDF.thirdPartyReason : '',
            width: '20%',
            style: 'smallDull'
          },
          {
            text: juror.thirdParty === 'Yes'? juror.thirdPartyDetails.reasonText : '',
            width: '*'
          }
          ],
          marginBottom: juror.thirdParty === 'Yes' ? 5 : 0
        },
        {
          canvas: [{
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 595 - 2 * 40,
            y2: 5,
            lineWidth: juror.thirdParty === 'Yes' ? 1.5 : 0,
            lineColor: juror.thirdParty === 'Yes' ? '#000' : '#fff'
          }],
          marginBottom: juror.thirdParty === 'Yes' ? 20 : 0,
        },
        {
          text: texts.ageIneligiblePDF.summoningBureau,
          style: 'bigBold',
          marginBottom: 10
        },
        {
          text: texts.ageIneligiblePDF.anyQuestionsOne,
          marginBottom: 10
        },
        {
          text: texts.sharedText.contactingInfoSummoningBureau
        },
        {
          text: texts.sharedText.contactingInfoEmailText,
          link: texts.sharedText.contactingInfoEmailLink,
          color: 'blue'
        },
        {
          text: texts.sharedText.contactingInfoTelOne
        },
        {
          text: texts.sharedText.contactingInfoTelTwo ? texts.sharedText.contactingInfoTelTwo : ''
        },
        {
          text: texts.sharedText.contactingInfoDaysOne
        },
        {
          text: texts.sharedText.contactingInfoDaysTwo
        },
        {
          text: texts.sharedText.contactingInfoCallChargesText,
          link: texts.sharedText.contactingInfoCallChargesLink,
          color: 'blue'
        },
      ],
      styles: {
        mainHeader: {
          fontSize: 23,
          bold: true
        },
        bigBold: {
          fontSize: 17,
          bold: true
        },
        smallBold: {
          bold: true,
          fontSize: 12
        },
        textReg: {
          fontSize: 12
        },
        smallDull: {
          fontSize: 12,
          color: '#666'
        },
        courtHeadings: {
          bold: true,
          fontSize: 11
        }
      }
    };
  };

})();
