import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constants/colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: colors.shadowColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  headerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  headerButton: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // headerRightText: {
  //   marginLeft: '18%',
  // },
  image: {
    width: 100,
    height: 100,
  },
  imageModal: {
    width: width * 0.95,
    height: width * 0.95 * 1.7,
  },
  loadingContainer: {
    height: '30%',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 20,
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: '25%',
    backgroundColor: colors.white,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.button,
  },
  horzScrol: {
    flexDirection: 'row',
    // height: 100,
    justfyContent: 'flex-start',
    marginBottom: 20,
  },
  imageView: {
    padding: 10,
  },
  sqBtn: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '10%',
    left: 10,
  },
  closeModal: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  padding: {
    paddingRight: 50,
  },
  titleText: {
    flex: 0.7,
  },
  dividerLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
