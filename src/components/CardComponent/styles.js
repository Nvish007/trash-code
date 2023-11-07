import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.shadowColor,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.shadowColor,
  },
  image: {
    width: '45%',
    height: 120,
    // borderRadius: 10,
  },
  imageView: {
    width: 100,
    padding: 10,
  },
  horzScrol: {
    backgroundColor: colors.white,
    justfyContent: 'flex-start',
    marginBottom: 10,
  },
  container: {
    // margin: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 2,
  },
  subContainer: {
    borderColor: colors.button,
    flex: 1,
    alignItems: 'flex-start',
    // width: windowWidth - 260,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
    color: colors.shadowColor,
  },
  icon: {
    // marginLeft: windowWidth - 230,
  },
});
